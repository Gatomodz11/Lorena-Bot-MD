let media = './Menu7.png'
let handler = async (m, { conn, command }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
    await conn.sendMessage(m.chat, { react: { text: '📇', key: m.key } })
let str = `*🔮 GRUPOS OFICIALES*

    *_╭━━━⊜ 🌸𝑪𝑰𝑵𝑻𝑯𝒀𝑰𝑨-𝐁𝐎𝐓🌹*
  *_┃🌩❏ ${gp1}_*
*_╰━━━━━━━━━━━━━━━━⊜_*

    *_╭━━━⊜ 🌸𝑪𝑰𝑵𝑻𝑯𝒀𝑰𝑨🌹 Test_*
  *_┃🌩❏ ${gp2}_*
*_╰━━━━━━━━━━━━━━━━⊜_*

 *🔮 GRUPOS EN COLABORACIÓN*

    *_╭━━━⊜ Curiosity y 𝑪𝑰𝑵𝑻𝑯𝒀𝑰𝑨*
  *_┃🌦❏ ${gp3}_*
*_╰━━━━━━━━━━━━━━━━⊜_*

    *_╭━━━⊜ Gato & 𝑪𝑰𝑵𝑻𝑯𝒀𝑰𝑨=*
  *_┃🌦❏ ${gp4}_*
*_╰━━━━━━━━━━━━━━━━⊜_*

  *🔮 CANAL OFICIAL*

    *_╭━━━⊜ Canal Gatomodz*
  *_┃🌦❏ ${channel}_*
*_╰━━━━━━━━━━━━━━━━⊜_*`
await conn.sendFile(m.chat, media, 'gata.mp4', str, fkontak)}

handler.command = /^grupos|linksk|gruposofc|gruposoficiales$/i
handler.register = true
handler.exp = 33

export default handler