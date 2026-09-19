/* Golden Chariot static website interactions. Requires jQuery 3.7+. */
const $ = window.jQuery;
$(function () {
  var $body = $("body");
  var $header = $(".site-header");
  var heroIndex = 0;
  var heroTotal = $(".hero-slide").length;
  var reviewIndex = 0;
  var $reviewTrack = $(".review-track");

  function showToast(message) {
    var $toast = $("#site-toast");
    $toast.text(message).addClass("is-visible");
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(function () { $toast.removeClass("is-visible"); }, 3600);
  }

  function scrollToTarget(target) {
    var $target = $(target);
    if (!$target.length) return;
    $("html, body").animate({ scrollTop: $target.offset().top - 80 }, 650);
  }

  function setHero(index) {
    heroIndex = (index + heroTotal) % heroTotal;
    $(".hero-slide").removeClass("is-active").eq(heroIndex).addClass("is-active");
    $(".slider-dot").removeClass("is-active").attr("aria-current", "false").eq(heroIndex).addClass("is-active").attr("aria-current", "true");
  }

  function visibleReviewCount() { return window.innerWidth <= 800 ? 1 : window.innerWidth <= 1150 ? 2 : 3; }
  function updateReviews(index) {
    var cards = $(".review-card").length;
    var maxIndex = Math.max(0, cards - visibleReviewCount());
    reviewIndex = Math.min(Math.max(index, 0), maxIndex);
    var cardWidth = $(".review-card").first().outerWidth(true);
    $reviewTrack.css("transform", "translateX(" + (-reviewIndex * cardWidth) + "px)");
    $(".review-dot").removeClass("is-active").attr("aria-current", "false").eq(reviewIndex).addClass("is-active").attr("aria-current", "true");
  }

  $(window).on("scroll", function () {
    $header.toggleClass("is-scrolled", window.scrollY > 25);
    var page = document.documentElement.scrollHeight - window.innerHeight;
    $(".scroll-progress").css("width", (page ? (window.scrollY / page) * 100 : 0) + "%");
  }).trigger("scroll");

  $("[data-scroll-target]").on("click", function (event) {
    event.preventDefault();
    scrollToTarget($(this).data("scroll-target"));
    $("#mobile-panel").removeClass("is-open");
    $body.removeClass("menu-open");
  });
  $(".menu-toggle").on("click", function () { $("#mobile-panel").addClass("is-open"); $body.addClass("menu-open"); });
  $("[data-close-menu]").on("click", function (event) { if (event.target === this || $(event.target).is("button")) { $("#mobile-panel").removeClass("is-open"); $body.removeClass("menu-open"); } });

  $("[data-open-quote]").on("click", function () {
    var product = $(this).data("product") || "";
    $("#quote-product").val(product);
    $("#quote-modal").addClass("is-open").attr("aria-hidden", "false");
    $body.addClass("modal-open");
    setTimeout(function () { $("#quote-name").trigger("focus"); }, 250);
  });
  $("[data-close-quote]").on("click", function (event) {
    if (event.target === this || $(event.target).is("button")) { $("#quote-modal").removeClass("is-open").attr("aria-hidden", "true"); $body.removeClass("modal-open"); }
  });
  $(document).on("keydown", function (event) { if (event.key === "Escape") { $("#mobile-panel").removeClass("is-open"); $("#quote-modal").removeClass("is-open").attr("aria-hidden", "true"); $body.removeClass("menu-open modal-open"); } });

  $(".slider-dot").on("click", function () { setHero($(this).index()); });
  window.heroSlider = setInterval(function () { setHero(heroIndex + 1); }, 4500);
  $(".hero").on("mouseenter", function () { clearInterval(window.heroSlider); }).on("mouseleave", function () { window.heroSlider = setInterval(function () { setHero(heroIndex + 1); }, 4500); });

  $("[data-review-direction]").on("click", function () { updateReviews(reviewIndex + Number($(this).data("review-direction"))); });
  $(".review-dot").on("click", function () { updateReviews($(this).index()); });
  $(window).on("resize", function () { updateReviews(reviewIndex); });
  updateReviews(0);

  $("#quote-form").on("submit", function (event) {
    event.preventDefault();
    $(this)[0].reset();
    $("#quote-modal").removeClass("is-open").attr("aria-hidden", "true");
    $body.removeClass("modal-open");
    showToast("Demo enquiry received — our Dubai team will be in touch shortly.");
  });
  $("#newsletter-form").on("submit", function (event) { event.preventDefault(); this.reset(); showToast("Thank you — you are on the Golden Chariot updates list."); });
  $("[data-coming-soon]").on("click", function (event) { event.preventDefault(); showToast("This page is being prepared — please contact us for current information."); });
});