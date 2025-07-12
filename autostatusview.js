// autostatusview.js
const fs = require('fs');
const path = require('path');

const handleStatusUpdate = async (client, message) => {
    // Ensure it's a status message before proceeding
    if (!message.isStatus) {
        return;
    }

    // Get configuration from environment variables
    const statusMode = process.env.AUTO_STATUS_VIEW_MODE; // e.g., 'VAD', 'VND', 'VNS'
    const sendViewMessage = process.env.SEND_STATUS_VIEW_MESSAGE === 'true'; // boolean flag
    const viewMessageText = process.env.STATUS_VIEW_MESSAGE_TEXT || "Hey, I've seen your status!"; // custom message

    console.log(`[STATUS HANDLER] Received status from: ${message.from.split('@')[0]} (Type: ${message.type})`);

    // --- FIX: Mark the entire 'status@broadcast' chat as seen ---
    try {
        const statusBroadcastChat = await client.getChatById('status@broadcast');
        if (statusBroadcastChat) {
            await statusBroadcastChat.sendSeen();
            console.log(`[STATUS HANDLER] Marked status broadcast as seen.`);
        } else {
            console.warn(`[STATUS HANDLER] Could not retrieve 'status@broadcast' chat to mark seen. Skipping marking as seen.`);
        }
    } catch (error) {
        // Log the error but continue with other actions if possible
        console.error(`[STATUS HANDLER] Error marking entire status broadcast as seen:`, error);
    }

    switch (statusMode) {
        case 'VAD': // View And Download, No SMS
            console.log('[STATUS HANDLER] Mode: VAD (View and Download, No SMS)');
            if (message.hasMedia) {
                try {
                    const media = await message.downloadMedia();
                    console.log(`[STATUS HANDLER] Downloaded media for status from ${message.from.split('@')[0]} (MimeType: ${media.mimetype}).`);
                    
                    // Ensure a 'downloads/statuses' directory exists
                    const downloadsDir = path.join(__dirname, 'downloads', 'statuses');
                    if (!fs.existsSync(downloadsDir)) {
                        fs.mkdirSync(downloadsDir, { recursive: true });
                    }
                    
                    // Create a safe filename for the downloaded media
                    const senderIdRaw = message.author || message.id.participant; // Get the actual sender's ID
                    const safeSenderId = senderIdRaw ? senderIdRaw.split('@')[0].replace(/[^a-zA-Z0-9]/g, '_') : 'unknown'; // Sanitize sender ID
                    const fileExtension = media.mimetype.split('/')[1].split(';')[0]; // e.g., 'jpeg', 'mp4'
                    const filename = `status_${safeSenderId}_${Date.now()}.${fileExtension}`;
                    const filePath = path.join(downloadsDir, filename);
                    
                    fs.writeFileSync(filePath, Buffer.from(media.data, 'base64'));
                    console.log(`[STATUS HANDLER] Saved media to: ${filePath}`);

                } catch (error) {
                    console.error(`[STATUS HANDLER] Error downloading media for status from ${message.from.split('@')[0]}:`, error);
                }
            }
            break;

        case 'VND': // View Not Download, No SMS
            console.log('[STATUS HANDLER] Mode: VND (View Not Download, No SMS)');
            // 'sendSeen()' is already handled above. No further action needed here.
            break;

        case 'VNS': // View and Send SMS (WhatsApp message)
            console.log('[STATUS HANDLER] Mode: VNS (View and Send SMS)');
            if (sendViewMessage) {
                try {
                    // --- FIX: Get the actual participant who posted the status ---
                    // For statuses (broadcast messages), the actual sender is in message.author or message.id.participant
                    const statusAuthorId = message.author || message.id.participant;
                    
                    if (statusAuthorId) {
                        await client.sendMessage(statusAuthorId, viewMessageText);
                        console.log(`[STATUS HANDLER] Sent view confirmation to ${statusAuthorId.split('@')[0]}: "${viewMessageText}"`);
                    } else {
                        console.warn(`[STATUS HANDLER] Could not determine status author to send confirmation message.`);
                    }
                } catch (error) {
                    console.error(`[STATUS HANDLER] Error sending view confirmation to status author:`, error);
                }
            } else {
                console.log('[STATUS HANDLER] SEND_STATUS_VIEW_MESSAGE is false, not sending view confirmation message.');
            }
            break;

        default:
            console.log(`[STATUS HANDLER] AUTO_STATUS_VIEW_MODE "${statusMode}" is not recognized or not set. Defaulting to basic view (mark seen only).`);
            break;
    }
};

module.exports = { handleStatusUpdate };