class Reservation {
  constructor(canvas, countdown) {
    this.canvas = canvas
    this.countdown = countdown

    $('#rsvp-btn').on('click', (e) => this.reserve(e))
    $('form.reservation').submit((e) => this.submitRsv(e))
    $('.cancelRsv').on('click', (e) => this.cancelRsv(e))
    $('button.map-only').on('click', (e) => this.mapOnly(e))
    $(window).unload(function () {
      sessionStorage.removeItem('Adresse')
    })
  }

  reserve(e) {
    e.preventDefault()

    if ($('#address').text() === ' ') {
      alert('Veuillez selectionner une station sur la carte')
    } else if ($('#available').text() === '0') {
      alert('Pas de vélo disponible, veuillez choisir une autre station')
    } else if ($('#status').text() === 'Fermé') {
      alert('Station Fermée')
    } else {
      $('.infos').css('display', 'none')
      $('.reservation').css('display', 'initial')
    }
  }

  submitRsv(e) {
    e.preventDefault()
    var nom = e.target.elements.nom.value
    var prenom = e.target.elements.prenom.value

    if (nom && prenom && this.canvas.isFilled()) {
      if ('Temps Restant' in sessionStorage) {
        let question = confirm(
          `Vous avez déjà une reservation en cours à ${sessionStorage.getItem(
            'Adresse'
          )}, voulez-vous l'abandonner pour une nouvelle?`
        )

        if (!question) {
          return
        }
      }
      var address = $('#addressR').text()
      sessionStorage.setItem('Adresse', address)
      localStorage.setItem('Nom', nom)
      localStorage.setItem('Prénom', prenom)

      $('p#addressC').text(address)
      this.showHideEffect(e, $('div.currentRsvp'), $('div.currentRsvp'))
      $('div.currentRsvp').get(0).scrollIntoView()
      $('form.reservation').hide()
      $('form.infos').hide()
      $('form.infos').show()
      this.countdown.start(20)
    } else if (nom && prenom && this.canvas.isFilled()) {
      alert("Votre signature n'est pas vraiment une signature...")
    } else {
      alert('Veuillez remplir les champs')
    }
  }

  cancelRsv(e) {
    let question = confirm(
      'Êtes-vous sûr(e) de vouloir annuler votre réservation?'
    )
    if (!question) {
      return
    }

    var address = ''
    sessionStorage.removeItem('Adresse')

    $('p#addressC').text(address)
    $('div.currentRsvp').hide()
    $('form.reservation').show()
    $('form.infos').hide()
    this.countdown.stop()
    sessionStorage.removeItem('Temps Restant')
  }

  mapOnly(e) {
    this.showHideEffect(e, $('.rsvp-btn'), $('div#map'))
  }

  showHideEffect(e, component1, component2) {
    component1.slideToggle(500)
    $('html, body').animate({ scrollTop: component2.offset().top }, 1000)
  }
}
