/* Shared interactions for Golden Chariot inner pages. Requires jQuery 3.7+. */
const $ = window.jQuery;

$(function () {
  var $body = $("body");
  var rootPath = String($body.data("root") || "../");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var iconMarkup = {
    location: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    sparkles: '<path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Z"/><path d="m18.5 14 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.3 2.5 3.5 5.5 3.5 9s-1.2 6.5-3.5 9c-2.3-2.5-3.5-5.5-3.5-9S9.7 5.5 12 3Z"/>',
    ship: '<path d="M4 17 2 12h20l-2 5M7 12V7h10v5M10 7V4h4v3M3 20c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0"/>',
    handshake: '<path d="m8 12 3 3c1 1 2.5 1 3.5 0l4.5-4.5M3 8l4-4 4 4-4 4-4-4ZM21 8l-4-4-4 4 4 4 4-4Z"/><path d="m7 12 4.5 4.5a2 2 0 0 0 3 0l.5-.5"/>',
    route: '<circle cx="6" cy="17" r="2"/><circle cx="18" cy="7" r="2"/><path d="M8 17h3a3 3 0 0 0 3-3v-4a3 3 0 0 1 3-3"/>',
    boxes: '<path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 7 8 4 8-4v10l-8 4-8-4V7ZM12 11v10"/>',
    sprout: '<path d="M12 21v-9M12 15c-4 0-7-2-7-6 4 0 7 2 7 6ZM12 12c0-4 3-7 7-7 0 4-3 7-7 7Z"/>',
    "search-check": '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5M8 10.5l1.7 1.7L13 9"/>',
    factory: '<path d="M3 21V10l6 3V9l6 4V5h4l2 16H3Z"/><path d="M7 17h2M12 17h2M17 17h2"/>',
    package: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9M8 5l8 4.5"/>',
    "badge-check": '<path d="m12 3 2.2 1.6 2.7-.2.8 2.6 2.3 1.5-.9 2.6.9 2.6-2.3 1.5-.8 2.6-2.7-.2L12 21l-2.2-1.6-2.7.2-.8-2.6L4 15.5l.9-2.6L4 10.3l2.3-1.5.8-2.6 2.7.2L12 3Z"/><path d="m8.5 12 2.2 2.2 4.8-4.8"/>',
    truck: '<path d="M3 6h11v11H3V6ZM14 10h4l3 3v4h-7v-7Z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
    "trending-up": '<path d="m4 17 6-6 4 4 6-8M15 7h5v5"/>',
    shield: '<path d="M12 3 4.5 6v5.5c0 4.7 3.2 8 7.5 9.5 4.3-1.5 7.5-4.8 7.5-9.5V6L12 3Z"/><path d="m8.5 12 2.2 2.2 4.8-4.8"/>',
    scale: '<path d="M12 3v18M5 6h14M7 6l-4 7h8L7 6ZM17 6l-4 7h8l-4-7ZM8 21h8"/>',
    droplet: '<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11Z"/>',
    thermometer: '<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z"/><path d="M12 8v8"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    leaf: '<path d="M20 4C11 4 5 8 5 15c0 2 1 4 3 5 7-1 11-6 12-16Z"/><path d="M5 20c3-5 7-8 12-11"/>',
    document: '<path d="M6 3h8l4 4v14H6V3Z"/><path d="M14 3v5h5M9 12h6M9 16h6"/>',
    linkedin: '<path fill="currentColor" stroke="none" d="M6.5 8.2H3.3V21h3.2V8.2ZM4.9 3A1.9 1.9 0 1 0 5 6.8 1.9 1.9 0 0 0 4.9 3Zm4 5.2V21h3.2v-6.3c0-1.7.3-3.3 2.4-3.3 2 0 2 1.9 2 3.4V21h3.2v-7c0-3.4-.7-6-4.7-6a4.1 4.1 0 0 0-3.7 2h-.1V8.2H8.9Z"/>',
    facebook: '<path fill="currentColor" stroke="none" d="M13.7 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5H17V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.5V13h2.8v8h3.4Z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/>',
    youtube: '<path d="M21 12s0-3.5-.5-5.2a2.8 2.8 0 0 0-2-2C16.8 4.3 12 4.3 12 4.3s-4.8 0-6.5.5a2.8 2.8 0 0 0-2 2C3 8.5 3 12 3 12s0 3.5.5 5.2a2.8 2.8 0 0 0 2 2c1.7.5 6.5.5 6.5.5s4.8 0 6.5-.5a2.8 2.8 0 0 0 2-2C21 15.5 21 12 21 12Z"/><path d="m10 9 5 3-5 3V9Z"/>',
    whatsapp: '<path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.6Z"/><path d="M8.5 8.2c.2-.5.4-.5.8-.5h.4c.1 0 .3 0 .4.4l.7 1.7c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4 0 .7.6 1 1.4 1.8 2.4 2.4.3.2.5.2.7 0l.8-1c.2-.2.4-.3.7-.2l1.8.9c.3.1.5.2.5.4 0 .2-.1 1.2-.8 1.8-.6.6-1.4.8-2 .8-.5 0-1.2-.2-2-.5-1.1-.5-4.6-1.7-6.2-5.8-.4-1-.1-1.9.5-2.5Z"/>'
  };

  function icon(name, className) {
    return '<svg class="ui-icon ' + (className || "") + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (iconMarkup[name] || iconMarkup.sparkles) + "</svg>";
  }

  function resolveSharedPaths(markup) {
    return markup.replace(/(href|src)="\/(?!\/)/g, '$1="' + rootPath);
  }

  function headerMarkup() {
    return '<div class="scroll-progress" data-testid="scroll-progress" aria-hidden="true"></div>' +
      '<div class="topbar" data-testid="top-contact-bar"><div class="container topbar-inner"><ul class="topbar-list"><li data-testid="top-bar-location">' + icon("location") + '<span>Dubai, United Arab Emirates</span></li><li><a href="tel:+971501234567" data-testid="top-bar-phone">' + icon("phone") + '<span>+971 50 123 4567</span></a></li><li><a href="mailto:info@goldenchariot.ae" data-testid="top-bar-email">' + icon("mail") + '<span>info@goldenchariot.ae</span></a></li></ul><ul class="social-list" aria-label="Social media"><li><button class="social-button" data-testid="social-linkedin" data-coming-soon aria-label="LinkedIn">' + icon("linkedin") + '</button></li><li><button class="social-button" data-testid="social-facebook" data-coming-soon aria-label="Facebook">' + icon("facebook") + '</button></li><li><button class="social-button" data-testid="social-instagram" data-coming-soon aria-label="Instagram">' + icon("instagram") + '</button></li></ul></div></div>' +
      '<header class="site-header" data-testid="site-header"><nav class="container nav" aria-label="Main navigation"><a class="brand-logo" href="/" data-testid="desktop-brand-logo" aria-label="Golden Chariot home"><img src="/assets/logo/golden-chariot-logo.png" alt="Golden Chariot Foodstuff Trading Co. LLC logo"></a><div class="nav-links"><a href="/" data-nav="home" data-testid="nav-home">Home</a><a href="/about-us/" data-nav="about" data-testid="nav-about">About Us</a><a href="/rice-products/" data-nav="rice" data-testid="nav-products">Rice Products</a><a href="/other-products/" data-nav="other" data-testid="nav-other-products">Other Products</a><a href="/quality/" data-nav="quality" data-testid="nav-quality">Quality</a><a href="/global-presence/" data-nav="global" data-testid="nav-global">Global Presence</a><a href="/contact-us/" data-nav="contact" data-testid="nav-contact">Contact Us</a></div><div class="nav-actions"><button class="nav-search" data-testid="nav-search" data-coming-soon aria-label="Search">' + icon("search") + '</button><button class="btn btn-gold" data-open-quote data-testid="header-get-quote-button">Get a Quote <span class="icon-arrow">→</span></button><button class="icon-button menu-toggle" data-testid="mobile-menu-open" aria-label="Open menu" aria-expanded="false">' + icon("menu") + '</button></div></nav></header>';
  }

  function footerMarkup() {
    return '<footer class="footer" data-testid="site-footer"><div class="container footer-main"><div class="footer-brand"><a class="brand-logo" href="/" data-testid="footer-brand-logo" aria-label="Golden Chariot home"><img src="/assets/logo/golden-chariot-logo.png" alt="Golden Chariot Foodstuff Trading Co. LLC logo"></a><p class="footer-tagline" data-testid="footer-tagline">Good Food. Brighter Lives.</p><p>A Dubai-based foodstuff trading company supplying premium rice to customers worldwide, with a growing portfolio of food commodities.</p><div class="footer-socials"><button data-coming-soon data-testid="footer-social-linkedin" aria-label="LinkedIn">' + icon("linkedin") + '</button><button data-coming-soon data-testid="footer-social-facebook" aria-label="Facebook">' + icon("facebook") + '</button><button data-coming-soon data-testid="footer-social-instagram" aria-label="Instagram">' + icon("instagram") + '</button><button data-coming-soon data-testid="footer-social-youtube" aria-label="YouTube">' + icon("youtube") + '</button></div></div><nav aria-label="Footer quick links"><h3>Quick Links</h3><ul class="footer-list"><li><a href="/" data-testid="footer-link-home">Home</a></li><li><a href="/about-us/" data-testid="footer-link-about">About Us</a></li><li><a href="/quality/" data-testid="footer-link-quality">Quality</a></li><li><a href="/global-presence/" data-testid="footer-link-global">Global Presence</a></li><li><a href="/contact-us/" data-testid="footer-link-contact">Contact</a></li></ul></nav><nav aria-label="Footer products"><h3>Our Products</h3><ul class="footer-list"><li><a href="/rice-products/1121-basmati-rice/" data-testid="footer-product-basmati">Basmati Rice</a></li><li><a href="/rice-products/" data-testid="footer-product-non-basmati">Non-Basmati Rice</a></li><li><a href="/rice-products/" data-testid="footer-product-parboiled">Parboiled Rice</a></li><li><a href="/rice-products/" data-testid="footer-product-broken">Broken Rice</a></li></ul></nav><div><h3>Contact Information</h3><ul class="footer-list footer-contact"><li data-testid="footer-address"><i>' + icon("location") + '</i>Dubai, United Arab Emirates</li><li><a href="tel:+971501234567" data-testid="footer-phone"><i>' + icon("phone") + '</i> +971 50 123 4567</a></li><li><a href="mailto:info@goldenchariot.ae" data-testid="footer-email"><i>' + icon("mail") + '</i> info@goldenchariot.ae</a></li></ul></div><div><h3>Newsletter</h3><p class="newsletter-copy">Get the latest updates on our products and global trade insights.</p><form id="newsletter-form" class="newsletter-form" data-testid="newsletter-form"><input type="email" required placeholder="Your Email Address" aria-label="Email address for newsletter" data-testid="newsletter-email-input"><button type="submit" aria-label="Subscribe to newsletter" data-testid="newsletter-submit-button">→</button></form></div></div><div class="footer-bottom"><div class="container"><span data-testid="footer-copyright">© 2026 Golden Chariot Foodstuff Trading Co. LLC. All Rights Reserved.</span><span class="footer-policy"><button data-coming-soon data-testid="footer-privacy-button">Privacy Policy</button><button data-coming-soon data-testid="footer-terms-button">Terms &amp; Conditions</button></span></div></div></footer>' +
      '<aside id="mobile-panel" class="mobile-panel" data-close-menu data-testid="mobile-menu-overlay" aria-hidden="true"><div class="mobile-menu" data-testid="mobile-menu-panel"><div class="mobile-brand"><a class="brand-logo" href="/" data-testid="mobile-brand-logo"><img src="/assets/logo/golden-chariot-logo.png" alt="Golden Chariot Foodstuff Trading Co. LLC logo"></a><button class="icon-button" data-close-menu data-testid="mobile-menu-close" aria-label="Close menu">' + icon("close") + '</button></div><ul class="mobile-links"><li><a href="/" data-testid="mobile-nav-home">Home</a></li><li><a href="/about-us/" data-testid="mobile-nav-about">About Us</a></li><li><a href="/rice-products/" data-testid="mobile-nav-products">Rice Products</a></li><li><a href="/other-products/" data-testid="mobile-nav-other-products">Other Products</a></li><li><a href="/quality/" data-testid="mobile-nav-quality">Quality</a></li><li><a href="/global-presence/" data-testid="mobile-nav-global">Global Presence</a></li><li><a href="/contact-us/" data-testid="mobile-nav-contact">Contact Us</a></li></ul><button class="btn btn-gold" data-open-quote data-testid="mobile-get-quote-button">Get a Quote <span class="icon-arrow">→</span></button><div class="mobile-socials"><button class="social-button" data-coming-soon data-testid="mobile-social-linkedin" aria-label="LinkedIn">' + icon("linkedin") + '</button><button class="social-button" data-coming-soon data-testid="mobile-social-facebook" aria-label="Facebook">' + icon("facebook") + '</button><button class="social-button" data-coming-soon data-testid="mobile-social-instagram" aria-label="Instagram">' + icon("instagram") + '</button></div></div></aside>' +
      '<div id="quote-modal" class="modal" data-close-quote data-testid="quote-modal-overlay" aria-hidden="true"><section class="modal-box" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title" data-testid="quote-modal"><div class="modal-head"><div><p class="eyebrow">Get a Quote</p><h2 id="quote-modal-title">Tell Us About Your Requirement</h2><p>Or reach us directly at +971 50 123 4567 · info@goldenchariot.ae</p></div><button class="modal-close" data-close-quote data-testid="quote-modal-close" aria-label="Close enquiry form">' + icon("close") + '</button></div><form id="quote-form" class="quote-form" data-testid="quote-form"><div class="field"><label for="quote-name">Name *</label><input id="quote-name" required placeholder="Your full name" data-testid="quote-name-input"></div><div class="field"><label for="quote-company">Company Name</label><input id="quote-company" placeholder="Your company" data-testid="quote-company-input"></div><div class="field"><label for="quote-email">Email *</label><input id="quote-email" type="email" required placeholder="you@company.com" data-testid="quote-email-input"></div><div class="field"><label for="quote-phone">Phone Number *</label><input id="quote-phone" type="tel" required placeholder="+971 ..." data-testid="quote-phone-input"></div><div class="field"><label for="quote-product">Product Interest *</label><select id="quote-product" required data-testid="quote-product-select"><option value="" selected disabled>Select a product</option><option>Basmati Rice</option><option>Non-Basmati Rice</option><option>Parboiled Rice</option><option>Broken Rice</option><option>Other Products</option></select></div><div class="field"><label for="quote-quantity">Required Quantity</label><input id="quote-quantity" placeholder="e.g. 25 MT / 1 container" data-testid="quote-quantity-input"></div><div class="field field-wide"><label for="quote-destination">Destination Country / Port</label><input id="quote-destination" placeholder="e.g. Mombasa, Kenya" data-testid="quote-destination-input"></div><div class="field field-wide"><label for="quote-message">Message *</label><textarea id="quote-message" required placeholder="Share your requirements, target specifications or questions..." data-testid="quote-message-input"></textarea></div><div class="field field-wide"><button class="btn btn-gold" type="submit" data-testid="quote-submit-button">Send Enquiry <span class="icon-arrow">→</span></button><p class="form-note" data-testid="quote-form-demo-notice">Demo form — your details are not stored or emailed yet.</p></div></form></section></div>' +
      '<a class="whatsapp" href="https://wa.me/971501234567?text=Hello%20Golden%20Chariot%2C%20I%20would%20like%20to%20enquire%20about%20your%20products." target="_blank" rel="noopener noreferrer" data-testid="whatsapp-float" aria-label="Chat with Golden Chariot on WhatsApp">' + icon("whatsapp") + '</a><div id="site-toast" class="toast" role="status" aria-live="polite" data-testid="site-toast"></div>';
  }

  $("[data-shared-header]").html(resolveSharedPaths(headerMarkup()));
  $("[data-shared-footer]").html(resolveSharedPaths(footerMarkup()));
  $("main img[src^='/assets/'], link[href^='/assets/']").each(function () {
    $(this).attr($(this).is("link") ? "href" : "src", rootPath + $(this).attr($(this).is("link") ? "href" : "src").slice(1));
  });
  $("main a[href^='/']").each(function () { $(this).attr("href", rootPath + $(this).attr("href").slice(1)); });
  $("[data-icon]").each(function () { $(this).html(icon($(this).data("icon"))); });

  var page = $body.data("page");
  $("[data-nav='" + page + "']").addClass("is-active").attr("aria-current", "page");

  function showToast(message) {
    var $toast = $("#site-toast");
    $toast.text(message).addClass("is-visible");
    clearTimeout(window.innerToastTimer);
    window.innerToastTimer = setTimeout(function () { $toast.removeClass("is-visible"); }, 3400);
  }

  $(window).on("scroll", function () {
    $(".site-header").toggleClass("is-scrolled", window.scrollY > 25);
    var available = document.documentElement.scrollHeight - window.innerHeight;
    $(".scroll-progress").css("width", (available ? (window.scrollY / available) * 100 : 0) + "%");
  }).trigger("scroll");

  $(".menu-toggle").on("click", function () {
    $("#mobile-panel").addClass("is-open").attr("aria-hidden", "false");
    $(this).attr("aria-expanded", "true");
    $body.addClass("menu-open");
  });

  $("[data-close-menu]").on("click", function (event) {
    if (event.target === this || $(event.target).closest("button").length) {
      $("#mobile-panel").removeClass("is-open").attr("aria-hidden", "true");
      $(".menu-toggle").attr("aria-expanded", "false");
      $body.removeClass("menu-open");
    }
  });

  $("[data-open-quote]").on("click", function () {
    $("#quote-product").val($(this).data("product") || "");
    $("#quote-modal").addClass("is-open").attr("aria-hidden", "false");
    $body.addClass("modal-open");
    setTimeout(function () { $("#quote-name").trigger("focus"); }, reducedMotion ? 0 : 220);
  });

  $("[data-close-quote]").on("click", function (event) {
    if (event.target === this || $(event.target).closest("button").length) {
      $("#quote-modal").removeClass("is-open").attr("aria-hidden", "true");
      $body.removeClass("modal-open");
    }
  });

  $(document).on("keydown", function (event) {
    if (event.key === "Escape") {
      $("#mobile-panel").removeClass("is-open").attr("aria-hidden", "true");
      $("#quote-modal").removeClass("is-open").attr("aria-hidden", "true");
      $body.removeClass("menu-open modal-open");
    }
  });

  $("#quote-form, #newsletter-form, #page-enquiry-form, #contact-form").on("submit", function (event) {
    event.preventDefault();
    this.reset();
    $("#quote-modal").removeClass("is-open").attr("aria-hidden", "true");
    $body.removeClass("modal-open");
    showToast("Demo enquiry received — our Dubai team will be in touch shortly.");
  });

  $("[data-coming-soon]").on("click", function (event) {
    event.preventDefault();
    showToast("This item is being prepared — contact us for current information.");
  });

  var activeCategory = "all";
  function filterCatalogue() {
    var query = ($("#rice-search").val() || "").toLowerCase().trim();
    var visible = 0;
    $(".catalog-product").each(function () {
      var $card = $(this);
      var categoryMatch = activeCategory === "all" || $card.data("category") === activeCategory;
      var textMatch = !query || ($card.data("name") || "").toLowerCase().indexOf(query) > -1;
      var extraLocked = $card.hasClass("is-extra") && !$("[data-load-more]").hasClass("is-loaded");
      var show = categoryMatch && textMatch && !extraLocked;
      $card.toggle(show);
      if (show) visible += 1;
    });
    $(".catalog-empty").toggle(visible === 0);
  }

  $("[data-rice-filter]").on("click", function () {
    activeCategory = $(this).data("rice-filter");
    $("[data-rice-filter]").removeClass("is-active").attr("aria-pressed", "false");
    $(this).addClass("is-active").attr("aria-pressed", "true");
    filterCatalogue();
  });
  $("#rice-search").on("input", filterCatalogue);
  $("[data-load-more]").on("click", function () {
    $(this).addClass("is-loaded").hide();
    filterCatalogue();
  });
  filterCatalogue();

  var $revealItems = $(".inner-section > .container, .page-hero .container, .dark-band > .container, .page-cta .container");
  $revealItems.addClass("inner-reveal");
  if (!reducedMotion && "IntersectionObserver" in window) {
    function revealPassedItems() {
      var viewportFloor = window.innerHeight - 20;
      $revealItems.not(".is-revealed").each(function () {
        if (this.getBoundingClientRect().top <= viewportFloor) this.classList.add("is-revealed");
      });
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px 30px" });
    $revealItems.each(function () { observer.observe(this); });
    $(window).on("scroll.inner-reveal resize.inner-reveal", revealPassedItems);
    window.requestAnimationFrame(revealPassedItems);
  } else {
    $revealItems.addClass("is-revealed");
  }

  $("main img").attr({ loading: "lazy", decoding: "async" });
  $(".page-hero img").removeAttr("loading").attr("fetchpriority", "high");
});