const $createClient = document.querySelector('#new-client')
$createClient.addEventListener('submit', function (event) {
  event.preventDefault()
  const $firstName = document.querySelector('#first-name')
  const $lastName = document.querySelector('#last-name')
  const $date = document.querySelector('#date')
  const first = $firstName.value
  const last = $lastName.value
  const date = $date.value
  const client = { first_name: first, last_name: last, intake_date: date }
  fetch('/clients', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(client)
  })
  .then(res => res.json())
  .then(newClient => {
    console.log(newClient)
  })
})
