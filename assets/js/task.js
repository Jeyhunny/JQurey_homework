$(document).ready(function () {
    //sidebar
    $(".open-icon").on("click", function () {
        $(".sidebar").addClass("show-sidebar");
        $(".overlay").css({ display: "block" });
        $(this).addClass("d-none");
        $(".close-icon").removeClass("d-none");
    })
    $(".close-icon").on("click", function () {
        $(".sidebar").removeClass("show-sidebar");
        $(".overlay").css({ display: "none" });
        $(this).addClass("d-none");
        $(".open-icon").removeClass("d-none");
    })
    //tab-menu

    $(".heading").on("click", function () {
        $(".active-heading").removeClass("active-heading");
        $(this).addClass("active-heading");
        let index = $(this).index();
        $(".content").addClass("d-none")
        $(".content").eq(index).removeClass("d-none");
    })
})

