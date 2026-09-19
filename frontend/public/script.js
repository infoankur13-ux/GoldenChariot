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

  function icon(name, className) {
    return '<svg class="ui-icon ' + (className || "") + '" aria-hidden="true"><use href="assets/icons.svg#' + name + '"></use></svg>';
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