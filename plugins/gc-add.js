const {generateWAMessageFromContent, prepareWAMessageMedia, proto} = (await import('@whiskeysockets/baileys')).default;
import fetch from 'node-fetch';
const {getBinaryNodeChild, getBinaryNodeChildren} = (await import('@whiskeysockets/baileys')).default;
const handler = async (m, {conn, text, participants, args}) => {
  if (!global.db.data.settings[conn.user.jid].restrict) throw '*¡Este Comando Esta Desabilitado Por El Propietario Del Bot!*';
  if (!args[0]) throw '*🦋 𝐈𝐧𝐠𝐫𝐞𝐬𝐞 𝐄𝐥 𝐍𝐮𝐦𝐞𝐫𝐨 𝐃𝐞 𝐀𝐥𝐠𝐮𝐧𝐚 𝐏𝐞𝐫𝐬𝐨𝐧𝐚 𝐐𝐮𝐞 𝐐𝐮𝐢𝐞𝐫𝐚𝐬 𝐀𝐧̃𝐚𝐝𝐢𝐫 𝐀𝐥 𝐆𝐫𝐮𝐩𝐨.*';
  try {
    const _participants = participants.map((user) => user.id);
    const users = (await Promise.all(
        text.split(',')
            .map((v) => v.replace(/[^0-9]/g, ''))
            .filter((v) => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
            .map(async (v) => [v, await conn.onWhatsApp(v + '@s.whatsapp.net')]))).filter((v) => v[1][0]?.exists).map((v) => v[0] + '@c.us');
    const response = await conn.query({tag: 'iq', attrs: {type: 'set', xmlns: 'w:g2', to: m.chat}, content: users.map((jid) => ({tag: 'add', attrs: {}, content: [{tag: 'participant', attrs: {jid}}]}))});
    const pp = await conn.profilePictureUrl(m.chat).catch((_) => null);
    const jpegThumbnail = pp ? await (await fetch(pp)).buffer() : Buffer.alloc(0);
    const add = getBinaryNodeChild(response, 'add');
    const participant = getBinaryNodeChildren(add, 'participant');
    for (const user of participant.filter((item) => item.attrs.error == 403)) {
      const jid = user.attrs.jid;
      const content = getBinaryNodeChild(user, 'add_request');
      const invite_code = content.attrs.code;
      const invite_code_exp = content.attrs.expiration;
      const teks = `*🍓 𝐍𝐨 𝐅𝐮𝐞 𝐏𝐨𝐬𝐢𝐛𝐥𝐞 𝐀𝐧̃𝐚𝐝𝐢𝐫 𝐀: @${jid.split('@')[0]}, 𝐏𝐨𝐫 𝐅𝐚𝐯𝐨𝐫 𝐄𝐧𝐯𝐢𝐚𝐥𝐞 𝐔𝐧𝐚 𝐈𝐧𝐯𝐢𝐭𝐚𝐜𝐢𝐨𝐧.*`;
      m.reply(teks, null, {mentions: conn.parseMention(teks)});
      const captionn = `🦋 𝑯𝒆𝒚 𝑨𝒎𝒊𝒈𝒐/𝑨 𝑺𝒐𝒚 𝑪𝑰𝑵𝑻𝑯𝒀𝑰𝑨 𝑼𝒏 𝑩𝒐𝒕 𝑫𝒆 𝑾𝒉𝒂𝒕𝒔𝑨𝒑𝒑 𝑼𝒏𝒂 𝑷𝒆𝒓𝒔𝒐𝒏𝒂 𝑫𝒆 𝑼𝒏 𝑮𝒓𝒖𝒑𝒐 𝑼𝒔𝒐 𝑬𝒍 𝑪𝒐𝒎𝒂𝒏𝒅𝒐 𝑷𝒂𝒓𝒂 𝑨𝒏̃𝒂𝒅𝒊𝒓𝒕𝒆 𝑷𝒆𝒓𝒐 𝑵𝒐 𝑷𝒖𝒅𝒆 𝑨𝒏̃𝒂𝒅𝒊𝒓𝒕𝒆 𝑨𝒔𝒊 𝑸𝒖𝒆 𝑻𝒆 𝑴𝒂𝒏𝒅𝒐 𝑳𝒂 𝑰𝒏𝒗𝒊𝒕𝒂𝒄𝒊𝒐𝒏 𝑻𝒆 𝑬𝒔𝒑𝒆𝒓𝒂𝒎𝒐 ✨`;
      const messaa = await prepareWAMessageMedia({image: jpegThumbnail}, {upload: conn.waUploadToServer});
      const groupInvite = generateWAMessageFromContent(m.chat, proto.Message.fromObject({groupInviteMessage: {groupJid: m.chat, inviteCode: invite_code, inviteExpiration: invite_code_exp, groupName: await conn.getName(m.chat), caption: captionn, jpegThumbnail: jpegThumbnail}}), {userJid: jid});
      await conn.relayMessage(jid, groupInvite.message, {messageId: groupInvite.key.id});
    }
  } catch {
    throw '🦋𝑬𝒓𝒓𝒐𝒓 𝑵𝒐 𝑺𝒆 𝑷𝒖𝒅𝒐 𝑨𝒏̃𝒂𝒅𝒊𝒓 𝑨𝒍 𝑰𝒏𝒕𝒆𝒈𝒓𝒂𝒏𝒕𝒆';
  }
};
handler.help = ['add', '+'].map((v) => v + ' número');
handler.tags = ['group'];
handler.command = /^(add|agregar|añadir|\+)$/i;
handler.admin = handler.group = handler.botAdmin = true;
export default handler;
