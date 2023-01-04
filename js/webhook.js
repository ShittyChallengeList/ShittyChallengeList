// WHY DOEST THIS FUCKING WOOOOOOOOOOOOORRRKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK JUST LET ME USE ENV IN CLIENT
require('dotenv').config()

const discordtag = document.getElementById('discordtag')
const levelnames = document.getElementById('levelnames')
const levelauthors = document.getElementById('levelauthors')
const listusername = document.getElementById('listusername')
const videolink = document.getElementById('videolink')
const fpsused = document.getElementById('fpsused')
const thoughts = document.getElementById('thoughts')
const form = document.getElementById('formrecordstuffthiswillbethelongestidintheworld')
const errorElement = document.getElementById('error')

form.addEventListener('submit', (e) => {
  let messages = []
  if (discordtag.value.trim() == '' || discordtag.value == null) {
    messages.push('Discord tag is required')
  }
  if (!(discordtag.value.includes("#"))) {
    messages.push('Discord tag must require a "#"')
  }
  if (levelnames.value.trim() === '' || levelnames.value == null) {
    messages.push('Level name(s) is required')
  }
  if (levelauthors.value.trim() === '' || levelauthors.value == null) {
    messages.push('Level author(s) is required')
  }
  if (listusername.value.trim() === '' || listusername.value == null) {
    messages.push('List username is required')
  }
  if (videolink.value.trim() === '' || videolink.value == null) {
    messages.push('Video link is required')
  }
  if (fpsused.value.trim() === '' || fpsused.value == null) {
    messages.push('Fps used is required')
  }
  if (isNaN(fpsused.value)) {
    messages.push('Fps used must be a number')
  }

  if (messages.length > 0) {
    e.preventDefault()
    errorElement.innerText = messages.join(', ')
  }
})
async function sendContact(ev) {
    ev.preventDefault();

    const webhookBody = {
      embeds: [{
        title: 'new record',
        fields: [
          { name: 'Discord Tag', value: discordtag.value.trim() },
          { name: 'Level Names', value: levelnames.value.trim() },
          { name: 'Level Authors', value: levelauthors.value.trim() },
          { name: 'List Username', value: listusername.value.trim() },
          { name: 'Video Link', value: videolink.value.trim() },
          { name: 'FPS Used', value: fpsused.value.trim() },
        ]
      }],
    };
    const opinionswebhookBody = {
      embeds: [{
        title: 'new opinion',
        fields: [
          { name: 'Thoughts', value: thoughts.value.trim() },
        ]
      }],
    };

    const recordwebhookUrl = process.env.RECORD_WEBHOOK_URL;
    const opinionswebhookUrl = process.env.OPINIONS_WEBHOOK_URL;

    const response = await fetch(recordwebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookBody),
    });
    const opinionsresponse = await fetch(opinionswebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(opinionswebhookBody),
    });
    form.reset();
  }