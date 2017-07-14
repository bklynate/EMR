const $createClient = document.querySelector('#new-client')
const $browse = document.querySelector('#browse')
const $save = document.querySelector('#save')

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
