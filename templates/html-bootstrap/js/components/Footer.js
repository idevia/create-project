const footerTemplate = /*html*/ `
<div class="footer">
  <div class="container">
  <div class="row">
    <div class="col-12 text-center">
      <div class="footer__logo">
        <img src="/assets/img/logo.svg" alt="iDevia" height="30" />
      </div>
    </div>
  </div>
  <div class="row py-4">
    <div class="col-md-3 col-sm-12">
      <h6 class="font-weight-bold">Contact Us</h6>
      <div class="footer__list">
        <ul>
          <li><a href="tel:+919791107278">(+91)9791107278</a></li>
          <li><a href="mailto:team@idevia.in">team@idevia.in</a></li>
          <li>P.IVA: 15501131005</li>
        </ul>
      </div>
    </div>
    <div class="col-md-3 col-sm-12">
      <h6 class="font-weight-bold">Our Company</h6>
      <div class="footer__list">
        <ul>
          <li><a href="#" class="text-decoration-none">About</a></li>
          <li><a href="#" class="text-decoration-none">FAQ</a></li>
        </ul>
      </div>
    </div>
    <div class="col-md-3 col-sm-12">
      <h6 class="font-weight-bold">Social Contacts</h6>
      <div class="footer__list">
        <ul>
          <li><a href="#" target="_blank" class="text-decoration-none">Facebook</a></li>
          <li><a href="#" target="_blank" class="text-decoration-none">Instagram</a></li>
        </ul>
      </div>
    </div>
    <div class="col-md-3 col-sm-12">
      <h6 class="font-weight-bold">Address</h6>
      <div class="footer__list">
        <ul>
          <li>
            iDevia Tech Private Limited<br />
            Park Street, Kolkata
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="footer__copyright">
  <p>Copyright @2020 iDevia</p>
</div>
</div>
`

class Footer extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = footerTemplate
  }
}

window.customElements.define('site-footer', Footer)
