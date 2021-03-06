/* eslint-disable camelcase */
const $createClient = document.querySelector('#new-client')
const $browse = document.querySelector('#browse')
const $results = document.querySelector('#results')
const $addClient = document.querySelector('#add-client')
const $addIcon = document.querySelector('#add-icon')
const $clientResults = document.querySelector('#client-results')

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
    $results.insertBefore($client, $addClient)
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

fetch('/clients')
  .then(response => {
    console.log(response)
    return response.json()
  })
  .then(clients => {
    clients.map(renderClient)
      .forEach($client => {
        $results.insertBefore($client, $addClient)
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
      const $showClient = document.querySelector('#show-client')
      $showClient.appendChild($clientDetail)
      document.querySelector('#client-results').classList.add('hidden')
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
