/* eslint-disable camelcase */
const $createClient = document.querySelector('#new-client')
const $browse = document.querySelector('#browse')
const $save = document.querySelector('#save')
const $results = document.querySelector('#results')
const $addClient = document.querySelector('#add-client')

$createClient.addEventListener('submit', function (event) {
  event.preventDefault()
  const formData = new FormData($createClient)
  fetch('/clients', {
    method: 'POST',
    body: formData
  })
  .then(res => console.log('done!'))
})

$browse.addEventListener('change', function (event) {
  const $picFile = document.querySelector('#pic-file')
  const fileNameIndex = $browse.value.lastIndexOf('\\')

  $picFile.value = $browse.value.substring(fileNameIndex + 1)
})

$save.addEventListener('click', function (event) {
  document.querySelector('#panel').style.display = 'none'
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
  const {first_name, last_name, intake_date, picture} = client
  const $col = document.createElement('div')
  $col.classList.add('col-sm-6')
  $col.classList.add('col-md-4')
  const $thumbnail = document.createElement('div')
  $thumbnail.classList.add('thumbnail')
  const $image = document.createElement('img')
  $image.setAttribute('src', 'images/' + picture)
  const $caption = document.createElement('div')
  $caption.classList.add('caption')
  const $fullname = document.createElement('h3')
  $fullname.textContent = first_name + ' ' + last_name
  const $date = document.createElement('p')
  const d = new Date(intake_date)
  const datestring = 'Intake Date:' + ' ' + (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear()
  $date.textContent = datestring
  console.log(intake_date)
  console.log(new Date(intake_date))

  $col.appendChild($thumbnail)
  $thumbnail.appendChild($image)
  $thumbnail.appendChild($caption)
  $caption.appendChild($fullname)
  $caption.appendChild($date)

  return $col
}
