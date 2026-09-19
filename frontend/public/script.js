/* Golden Chariot static website interactions. Requires jQuery 3.7+. */
const $ = window.jQuery;

$(function () {
  var $body = $("body");
  var $header = $(".site-header");
  var $hero = $(".hero");
  var $heroSlides = $(".hero-slide");
  var $heroDots = $(".slider-dot");
  var $reviewTrack = $(".review-track");
  var heroIndex = 0;
  var heroTotal = $heroSlides.length;
  var heroTimer = null;
  var reviewIndex = 0;
  var reviewDotCount = 0;
  var touchStartX = 0;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var iconMarkup = {
    location: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    "chevron-left": '<path d="m15 18-6-6 6-6"/>',
    "chevron-right": '<path d="m9 18 6-6-6-6"/>',
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
    "user-heart": '<circle cx="9" cy="8" r="4"/><path d="M2.5 21a6.5 6.5 0 0 1 11.7-3.9M18.5 13.5c-2-2.2-5.5.9 0 4.5 5.5-3.6 2-6.7 0-4.5Z"/>',
    "badge-check": '<path d="m12 3 2.2 1.6 2.7-.2.8 2.6 2.3 1.5-.9 2.6.9 2.6-2.3 1.5-.8 2.6-2.7-.2L12 21l-2.2-1.6-2.7.2-.8-2.6L4 15.5l.9-2.6L4 10.3l2.3-1.5.8-2.6 2.7.2L12 3Z"/><path d="m8.5 12 2.2 2.2 4.8-4.8"/>',
    truck: '<path d="M3 6h11v11H3V6ZM14 10h4l3 3v4h-7v-7Z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
    "trending-up": '<path d="m4 17 6-6 4 4 6-8M15 7h5v5"/>',
    linkedin: '<path fill="currentColor" stroke="none" d="M6.5 8.2H3.3V21h3.2V8.2ZM4.9 3A1.9 1.9 0 1 0 5 6.8 1.9 1.9 0 0 0 4.9 3Zm4 5.2V21h3.2v-6.3c0-1.7.3-3.3 2.4-3.3 2 0 2 1.9 2 3.4V21h3.2v-7c0-3.4-.7-6-4.7-6a4.1 4.1 0 0 0-3.7 2h-.1V8.2H8.9Z"/>',
    facebook: '<path fill="currentColor" stroke="none" d="M13.7 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5H17V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.5V13h2.8v8h3.4Z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/>',
    youtube: '<path d="M21 12s0-3.5-.5-5.2a2.8 2.8 0 0 0-2-2C16.8 4.3 12 4.3 12 4.3s-4.8 0-6.5.5a2.8 2.8 0 0 0-2 2C3 8.5 3 12 3 12s0 3.5.5 5.2a2.8 2.8 0 0 0 2 2c1.7.5 6.5.5 6.5.5s4.8 0 6.5-.5a2.8 2.8 0 0 0 2-2C21 15.5 21 12 21 12Z"/><path d="m10 9 5 3-5 3V9Z"/>',
    whatsapp: '<path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.6Z"/><path d="M8.5 8.2c.2-.5.4-.5.8-.5h.4c.1 0 .3 0 .4.4l.7 1.7c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4 0 .7.6 1 1.4 1.8 2.4 2.4.3.2.5.2.7 0l.8-1c.2-.2.4-.3.7-.2l1.8.9c.3.1.5.2.5.4 0 .2-.1 1.2-.8 1.8-.6.6-1.4.8-2 .8-.5 0-1.2-.2-2-.5-1.1-.5-4.6-1.7-6.2-5.8-.4-1-.1-1.9.5-2.5Z"/>'
  };

  function icon(name, className) {
    return '<svg class="ui-icon ' + (className || "") + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + iconMarkup[name] + "</svg>";
  }

  function applyPhotography() {
    var images = [
      [".hero-slide:eq(0) img", "assets/images/hero-dubai.jpg", "Dubai skyline at golden hour"],
      [".hero-slide:eq(2) img", "assets/images/hero-harvest.jpg", "Mature rice crop ready for harvest"],
      [".hero-slide:eq(3) img", "assets/images/hero-logistics.jpg", "Container vessel at an international cargo port"],
      [".product-card:eq(2) img", "assets/images/product-parboiled.jpg", "Parboiled rice grains in a ceramic bowl"],
      [".trade-gallery figure:eq(0) img", "assets/images/trade-warehouse.jpg", "Organized distribution warehouse operations"],
      [".trade-gallery figure:eq(2) img", "assets/images/trade-logistics.jpg", "International container terminal logistics"],
      [".process-step:eq(0) img", "assets/images/process-sourcing.jpg", "Hand inspecting mature rice grain at source"],
      [".process-step:eq(2) img", "assets/images/process-processing.jpg", "Packaged food commodities in a modern warehouse"],
      [".process-step:eq(4) img", "assets/images/hero-logistics.jpg", "International cargo vessel ready for delivery"],
      [".about-media img", "assets/images/about-dubai.jpg", "Dubai skyline at golden hour"],
      [".private-media img", "assets/images/private-logistics.jpg", "Container vessel and port cranes supporting global trade"],
      [".cta > img", "assets/images/cta-harvest.jpg", "Mature rice field in warm sunlight"]
    ];

    images.forEach(function (asset) {
      $(asset[0]).attr({ src: asset[1], alt: asset[2], decoding: "async" });
    });

    $("main img, footer img").not(".hero-slide img").attr("loading", "lazy");
    $(".hero-slide img").attr("decoding", "async");
    $(".hero-slide:first img").attr("fetchpriority", "high");
  }

  function applyIcons() {
    $("[data-testid='top-bar-location']").html(icon("location") + "<span>Dubai, United Arab Emirates</span>");
    $("[data-testid='top-bar-phone']").html(icon("phone") + "<span>+971 50 123 4567</span>");
    $("[data-testid='top-bar-email']").html(icon("mail") + "<span>info@goldenchariot.ae</span>");
    $("[data-testid='nav-search']").html(icon("search"));
    $("[data-testid='mobile-menu-open']").html(icon("menu"));
    $("[data-testid='mobile-menu-close'], [data-testid='quote-modal-close']").html(icon("close"));
    $("[data-testid='hero-contact-button']").html(icon("phone") + "<span>Contact Us</span>");
    $(".trust-icon").each(function (index) { $(this).html(icon(["sparkles", "globe", "ship", "handshake"][index])); });
    $(".feature-icon").each(function (index) { $(this).html(icon(["globe", "route", "boxes"][index])); });
    $(".step-icon").each(function (index) { $(this).html(icon(["sprout", "search-check", "factory", "package", "ship"][index])); });
    $(".benefit-icon").each(function (index) { $(this).html(icon(["user-heart", "badge-check", "truck", "trending-up"][index])); });
    $(".location-pin").html(icon("location"));
    $("[data-review-direction='-1']").html(icon("chevron-left"));
    $("[data-review-direction='1']").html(icon("chevron-right"));
    $("[data-testid='footer-address'] i").html(icon("location"));
    $("[data-testid='footer-phone'] i").html(icon("phone"));
    $("[data-testid='footer-email'] i").html(icon("mail"));
    $("[data-testid='whatsapp-float']").html(icon("whatsapp"));

    ["linkedin", "facebook", "instagram", "youtube"].forEach(function (network) {
      $("[data-testid$='social-" + network + "']").html(icon(network));
    });
  }

  function showToast(message) {
    var $toast = $("#site-toast");
    $toast.text(message).addClass("is-visible");
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(function () { $toast.removeClass("is-visible"); }, 3600);
  }

  function scrollToTarget(target) {
    var $target = $(target);
    if (!$target.length) return;
    $("html, body").animate({ scrollTop: $target.offset().top - $header.outerHeight() }, reducedMotion ? 0 : 650);
  }

  function setHero(index) {
    heroIndex = (index + heroTotal) % heroTotal;
    $heroSlides.removeClass("is-active").attr("aria-hidden", "true").eq(heroIndex).addClass("is-active").attr("aria-hidden", "false");
    $heroDots.removeClass("is-active").attr("aria-current", "false").eq(heroIndex).addClass("is-active").attr("aria-current", "true");
  }

  function startHero() {
    clearInterval(heroTimer);
    if (!reducedMotion && !document.hidden) heroTimer = setInterval(function () { setHero(heroIndex + 1); }, 5200);
  }

  function visibleReviewCount() {
    return window.innerWidth <= 800 ? 1 : window.innerWidth <= 1150 ? 2 : 3;
  }

  function buildReviewDots() {
    var count = Math.max(1, $(".review-card").length - visibleReviewCount() + 1);
    if (count === reviewDotCount) return;
    reviewDotCount = count;
    var dots = "";
    for (var i = 0; i < count; i += 1) {
      dots += '<button class="review-dot" data-testid="review-carousel-dot-' + (i + 1) + '" aria-label="Show review set ' + (i + 1) + '"></button>';
    }
    $(".review-dots").html(dots);
  }

  function updateReviews(index) {
    buildReviewDots();
    var cards = $(".review-card").length;
    var maxIndex = Math.max(0, cards - visibleReviewCount());
    reviewIndex = Math.min(Math.max(index, 0), maxIndex);
    var cardWidth = $(".review-card").first().outerWidth(true) || 0;
    $reviewTrack.css("transform", "translate3d(" + (-reviewIndex * cardWidth) + "px,0,0)");
    $(".review-dot").removeClass("is-active").attr("aria-current", "false").eq(reviewIndex).addClass("is-active").attr("aria-current", "true");
    $("[data-review-direction='-1']").prop("disabled", reviewIndex === 0);
    $("[data-review-direction='1']").prop("disabled", reviewIndex === maxIndex);
  }

  function setupRevealAnimations() {
    var selectors = [
      ".trust-item", ".section-heading", ".product-card", ".trade-gallery", ".trade-layout > div:last-child",
      ".process-step", ".about-layout > *", ".review-summary", ".review-stage", ".global-layout > *",
      ".private-layout > *", ".cta-content", ".footer-main > *"
    ];
    var $items = $(selectors.join(","));
    $items.addClass("reveal");
    $items.each(function (index) { this.style.setProperty("--reveal-delay", ((index % 5) * 70) + "ms"); });
    if (reducedMotion || !("IntersectionObserver" in window)) {
      $items.addClass("is-revealed");
      return;
    }
    $body.addClass("js-reveal-ready");
    function revealPassedItems() {
      var viewportFloor = window.innerHeight - 24;
      $items.not(".is-revealed").each(function () {
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
    }, { threshold: 0.04, rootMargin: "0px 0px 24px" });
    $items.each(function () { observer.observe(this); });
    $(window).on("scroll.reveal resize.reveal", revealPassedItems);
    window.requestAnimationFrame(revealPassedItems);
  }

  applyPhotography();
  applyIcons();
  setupRevealAnimations();
  $heroSlides.attr("aria-hidden", "true").eq(0).attr("aria-hidden", "false");
  $("[data-testid='mobile-menu-open']").attr("aria-expanded", "false");

  $(window).on("scroll", function () {
    $header.toggleClass("is-scrolled", window.scrollY > 25);
    var page = document.documentElement.scrollHeight - window.innerHeight;
    $(".scroll-progress").css("width", (page ? (window.scrollY / page) * 100 : 0) + "%");
  }).trigger("scroll");

  $body.on("click", "[data-scroll-target]", function (event) {
    event.preventDefault();
    scrollToTarget($(this).data("scroll-target"));
    $("#mobile-panel").removeClass("is-open").attr("aria-hidden", "true");
    $("[data-testid='mobile-menu-open']").attr("aria-expanded", "false");
    $body.removeClass("menu-open");
  });

  $(".menu-toggle").on("click", function () {
    $("#mobile-panel").addClass("is-open").attr("aria-hidden", "false");
    $(this).attr("aria-expanded", "true");
    $body.addClass("menu-open");
  });

  $("[data-close-menu]").on("click", function (event) {
    if (event.target === this || $(event.target).closest("button").length) {
      $("#mobile-panel").removeClass("is-open").attr("aria-hidden", "true");
      $("[data-testid='mobile-menu-open']").attr("aria-expanded", "false").trigger("focus");
      $body.removeClass("menu-open");
    }
  });

  $("[data-open-quote]").on("click", function () {
    var product = $(this).data("product") || "";
    $("#quote-product").val(product);
    $("#quote-modal").addClass("is-open").attr("aria-hidden", "false");
    $body.addClass("modal-open");
    setTimeout(function () { $("#quote-name").trigger("focus"); }, reducedMotion ? 0 : 250);
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
      $("[data-testid='mobile-menu-open']").attr("aria-expanded", "false");
      $body.removeClass("menu-open modal-open");
    }
  });

  $heroDots.on("click", function () { setHero($(this).index()); startHero(); });
  $hero.on("mouseenter focusin", function () { clearInterval(heroTimer); }).on("mouseleave focusout", startHero);
  $hero.on("touchstart", function (event) { touchStartX = event.originalEvent.touches[0].clientX; });
  $hero.on("touchend", function (event) {
    var distance = event.originalEvent.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 45) { setHero(heroIndex + (distance < 0 ? 1 : -1)); startHero(); }
  });
  $(document).on("visibilitychange", function () { if (document.hidden) clearInterval(heroTimer); else startHero(); });
  startHero();

  $body.on("click", "[data-review-direction]", function () { updateReviews(reviewIndex + Number($(this).data("review-direction"))); });
  $body.on("click", ".review-dot", function () { updateReviews($(this).index()); });
  $reviewTrack.on("touchstart", function (event) { touchStartX = event.originalEvent.touches[0].clientX; });
  $reviewTrack.on("touchend", function (event) {
    var distance = event.originalEvent.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 45) updateReviews(reviewIndex + (distance < 0 ? 1 : -1));
  });
  $(window).on("resize", function () { updateReviews(reviewIndex); });
  updateReviews(0);

  $("#quote-form").on("submit", function (event) {
    event.preventDefault();
    $(this)[0].reset();
    $("#quote-modal").removeClass("is-open").attr("aria-hidden", "true");
    $body.removeClass("modal-open");
    showToast("Demo enquiry received — our Dubai team will be in touch shortly.");
  });

  $("#newsletter-form").on("submit", function (event) {
    event.preventDefault();
    this.reset();
    showToast("Thank you — you are on the Golden Chariot updates list.");
  });

  $("[data-coming-soon]").on("click", function (event) {
    event.preventDefault();
    showToast("This page is being prepared — please contact us for current information.");
  });
});