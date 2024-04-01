const handler = async (m) => {
  global.db.data.chats[m.chat].isBanned = false;
  m.reply('✅️ *Chat Desbaneado Con Exito, Ya Pueden Usar 🌹𝑪𝑰𝑵𝑻𝑯𝒀𝑰𝑨🌻 - MD*');
};
handler.help = ['unbanchat'];
handler.tags = ['owner'];
handler.command = /^unbanchat$/i;
handler.rowner = true;
export default handler;

