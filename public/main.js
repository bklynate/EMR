/* eslint-disable camelcase */
/* global $ */
const $createClient = document.querySelector('#new-client')
const $browse = document.querySelector('#browse')
const $addClient = document.querySelector('#add-client')
const $addIcon = document.querySelector('#add-icon')
const $clientResults = document.querySelector('#client-results')
const $noteButton = document.querySelector('#note-button')
const $createNote = document.querySelector('#create-note')
const $showClient = document.querySelector('#show-client')
const $displayClient = document.querySelector('#display-client')
const $displayNote = document.querySelector('#display-note')
const $panelClients = document.querySelector('#panel-clients')

$createClient.addEventListener('submit', function (event) {
  event.preventDefault()
  const formData = new FormData($createClient)
  fetch('/clients', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(client => {
    const $client = renderClient(client)
    $panelClients.insertBefore($client, $addClient)
    $clientResults.classList.remove('hidden')
    document.querySelector('#panel').classList.add('hidden')
  })
})

$browse.addEventListener('change', function (event) {
  const $picFile = document.querySelector('#pic-file')
  const fileNameIndex = $browse.value.lastIndexOf('\\')

  $picFile.value = $browse.value.substring(fileNameIndex + 1)
})

$addIcon.addEventListener('click', function (event) {
  $clientResults.classList.add('hidden')
  document.querySelector('#panel').classList.remove('hidden')
})

$noteButton.addEventListener('click', function (event) {
  $('#modal').modal('show')
})

$createNote.addEventListener('submit', function (event) {
  event.preventDefault()
  const $noteDate = document.querySelector('#note-date')
  const $occupation = document.querySelector('#occupation')
  const $messageText = document.querySelector('#message-text')
  const $clientsId = document.querySelector('#clients-id')
  const noteDate = $noteDate.value
  const occupation = $occupation.value
  const messageText = $messageText.value
  const clientsId = $clientsId.value
  const note = {note_date: noteDate, note_text: messageText, note_type: occupation, clients_id: clientsId}
  fetch('/notes', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(note)
  })
  .then(res => res.json())
  .then(newNote => {
    console.log(newNote)
  })
})

fetch('/clients')
  .then(response => {
    console.log(response)
    return response.json()
  })
  .then(clients => {
    clients.map(renderClient)
      .forEach($client => {
        $panelClients.insertBefore($client, $addClient)
      })
  })

function renderClient(client) {
  const {first_name, last_name, intake_date, picture, id} = client
  const $col = document.createElement('div')
  $col.classList.add('col-sm-6')
  $col.classList.add('col-md-4')
  const $thumbnail = document.createElement('div')
  $thumbnail.classList.add('thumbnail')
  const $image = document.createElement('img')
  $image.classList.add('image')
  $image.setAttribute('src', 'images/' + picture)
  $image.setAttribute('data-id', id)
  const $caption = document.createElement('div')
  $caption.classList.add('caption')
  const $fullname = document.createElement('h3')
  $fullname.textContent = first_name + ' ' + last_name
  const $date = document.createElement('p')
  $date.setAttribute('id', 'dateAlign')
  const d = new Date(intake_date)
  const datestring = 'Intake Date:' + ' ' + (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear()
  $date.textContent = datestring

  $col.appendChild($thumbnail)
  $thumbnail.appendChild($image)
  $thumbnail.appendChild($caption)
  $caption.appendChild($fullname)
  $caption.appendChild($date)

  return $col
}

function viewClientById(id) {
  return fetch('/clients/' + id)
  .then(response => {
    return response.json()
  })
}

$clientResults.addEventListener('click', function (event) {
  const clientId = event.target.getAttribute('data-id')
  if (clientId) {
    viewClientById(clientId)
    .then(data => {
      const $clientDetail = renderClientDetailView(data)
      const $button = $showClient.querySelector('button')
      const $getId = document.querySelector('#clients-id')
      $getId.value = clientId
      $displayClient.appendChild($clientDetail)
      $clientResults.classList.add('hidden')
      $showClient.classList.remove('hidden')
      $displayClient.insertBefore($clientDetail, $button)
      fetch('/notes?clients_id=' + clientId)
        .then(response => {
          console.log(response)
          return response.json()
        })
        .then(notes => {
          notes.map(renderNote)
            .forEach($note => {
              console.log($note)
              $displayNote.appendChild($note)
            })
        })
    })
  }
})

function renderClientDetailView(client) {
  const {first_name, last_name, intake_date, picture, id} = client
  const $div = document.createElement('div')
  const $imageSingle = document.createElement('img')
  $imageSingle.setAttribute('src', 'images/' + picture)
  $imageSingle.setAttribute('data-id', id)
  const $caption = document.createElement('div')
  $caption.classList.add('caption')
  const $fullname = document.createElement('h1')
  $fullname.textContent = first_name + ' ' + last_name
  const $date = document.createElement('h4')
  const d = new Date(intake_date)
  const datestring = 'Intake Date:' + ' ' + (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear()
  $date.textContent = datestring

  $div.appendChild($imageSingle)
  $div.appendChild($caption)
  $caption.appendChild($fullname)
  $caption.appendChild($date)

  return $div
}

function renderNote(note) {
  const {note_date, note_type, note_text} = note
  if (note_type === 'doctor') {
    const $div = document.createElement('div')
    $div.classList.add('panel')
    $div.classList.add('panel-success')
    const $panelHeader = document.createElement('div')
    $panelHeader.classList.add('panel-heading')
    const $panelBody = document.createElement('div')
    $panelBody.classList.add('panel-body')
    const $content = document.createElement('p')
    const $date = document.createElement('h4')
    const d = new Date(note_date)
    const datestring = 'Date:' + ' ' + (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear()

    $date.textContent = datestring
    $panelHeader.textContent = note_type
    $content.textContent = note_text

    $div.appendChild($panelHeader)
    $div.appendChild($panelBody)
    $panelBody.appendChild($date)
    $panelBody.appendChild($content)

    return $div
  }
  else if (note_type === 'therapist') {
    const $div = document.createElement('div')
    $div.classList.add('panel')
    $div.classList.add('panel-info')
    const $panelHeader = document.createElement('div')
    $panelHeader.classList.add('panel-heading')
    const $panelBody = document.createElement('div')
    $panelBody.classList.add('panel-body')
    const $content = document.createElement('p')
    const $date = document.createElement('h4')
    const d = new Date(note_date)
    const datestring = 'Date:' + ' ' + (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear()

    $date.textContent = datestring
    $panelHeader.textContent = note_type
    $content.textContent = note_text

    $div.appendChild($panelHeader)
    $div.appendChild($panelBody)
    $panelBody.appendChild($date)
    $panelBody.appendChild($content)

    return $div
  }
  else if (note_type === 'case manager') {
    const $div = document.createElement('div')
    $div.classList.add('panel')
    $div.classList.add('panel-warning')
    const $panelHeader = document.createElement('div')
    $panelHeader.classList.add('panel-heading')
    const $panelBody = document.createElement('div')
    $panelBody.classList.add('panel-body')
    const $content = document.createElement('p')
    const $date = document.createElement('h4')
    const d = new Date(note_date)
    const datestring = 'Date:' + ' ' + (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear()

    $date.textContent = datestring
    $panelHeader.textContent = note_type
    $content.textContent = note_text

    $div.appendChild($panelHeader)
    $div.appendChild($panelBody)
    $panelBody.appendChild($date)
    $panelBody.appendChild($content)

    return $div
  }
}
