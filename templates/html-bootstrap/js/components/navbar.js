const navbarTemplate = /*html*/ `
<nav class="navbar navbar-expand-lg navbar-light mt-2">
  <div class="container">
    <a class="navbar-brand" href="/">
      <img src="/assets/img/logo.svg" alt="ImmobilApp" height="40" />
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#mainNav"
      aria-controls="mainNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="mainNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a href="./pricing.html" class="nav-link">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="./about.html">About</a>
        </li>
        <li class="nav-item">
          <a href="./contact.html" class="nav-link">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`

class Navbar extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = navbarTemplate

    const navbarLinks = this.querySelectorAll('.navbar-nav .nav-item')
    const linkLocationArr = window.location.href.toString().split('/')
    const linkLocation = linkLocationArr[linkLocationArr.length - 1].split('.')[0]

    switch (linkLocation) {
      case 'pricing':
        navbarLinks[0].classList.add('active')
        break
      case 'about':
        navbarLinks[1].classList.add('active')
        break
      case 'contact':
        navbarLinks[2].classList.add('active')
        break
      default:
        break
    }
  }
}

window.customElements.define('nav-bar', Navbar)
