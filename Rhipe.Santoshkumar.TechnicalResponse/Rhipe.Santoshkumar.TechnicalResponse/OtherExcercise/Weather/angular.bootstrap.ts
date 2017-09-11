///<reference path="typings/angular/angular.d.ts" />///

module DW.Webparts.Angular.Bootstrap {

    function dwangular() {

        /// PageContact
        angular.bootstrap(document.getElementById("DWPageContactHolder"), ["pageContactApp"]);
        /// PageLastModifiedContact
        angular.bootstrap(document.getElementById("DWPageLastModifiedContactHolder"), ["pageLastModifiedContactApp"]);

        /// Alerts
        angular.bootstrap(document.getElementById("DWAlertsContainerHolder"), ["alertsApp"]);

        /// RelatedLinks
        angular.bootstrap(document.getElementById("DWRelatedLinksHolder"), ["relatedLinksApp"]);

        /// CorporateLastUpdate
        angular.bootstrap(document.getElementById("DWLastCorporateUpdateHolder"), ["corporateLastUpdateApp"]);

        /// Viostream video
        angular.bootstrap(document.getElementById("DWVioStreamHolder"), ["viostreamVideo"]);

        ///Featured News
        angular.bootstrap(document.getElementById("DWFeaturedNewsCenterHolder"), ["featuredNewsCenterApp"]);

        ///Latest News
        angular.bootstrap(document.getElementById("DWLatestNewsCenterHolder"), ["latestNewsCenterApp"]);

        ///Featured Health and Wellness
        angular.bootstrap(document.getElementById("DWFeaturedHWCenterHolder"), ["featuredHWCenterApp"]);
        ///Non Featured Health and Wellness
        angular.bootstrap(document.getElementById("DWNonFeaturedHWCenterHolder"), ["nonFeaturedHWCenterApp"]);

        ///Employee TV Stream
        angular.bootstrap(document.getElementById("DWEmployeeTVStreamHolder"), ["employeeTVStreamApp"]);

        angular.bootstrap(document.getElementById("etvCarouselHolder"), ["empTVCarouselApp"]);

        angular.bootstrap(document.getElementById("DWBlogLatestHolder"), ["blogApp"]);

        ///Poll
        angular.bootstrap(document.getElementById("DWPollHolder"), ["pollApp"]);

        angular.bootstrap(document.getElementById("SocialWallContainer"), ["DWSocialWall"]);


        angular.bootstrap(document.getElementById("weather-widget"), ["weatherTimeZoneApp"]);

        angular.bootstrap(document.getElementById("newsCarouselSection"), ["FeaturedNewsCarouselApp"]);
        //news prev next button
        angular.bootstrap(document.getElementById("DWNewsPageHolder"), ["newsApp"]);
        //Corporate Pinboard
        angular.bootstrap(document.getElementById("DWCorporatePinboardHolder"), ["corporatePinboardApp"]);

        //MyContents
        angular.bootstrap(document.getElementById("DWMyContentsHolder"), ["myContentsApp"]);

        //Contact Me
        angular.bootstrap(document.getElementById("DWContactMeHolder"), ["contactMeApp"]);

        //Corporate Workspace Breadcrumbs naviation
        angular.bootstrap(document.getElementById("DWCorporateWSBreadcrumbsContainerHolder"), ["corporateWSBreadcrumbsApp"]);

        //News Center Link
        angular.bootstrap(document.getElementById("DWNewsLinkContentsHolder"), ["newsLinkApp"]);

        angular.bootstrap(document.getElementById("DWUserPicturePart"), ["userProfileApp"]);

        angular.bootstrap(document.getElementById("DWUpComingEvents"), ["UpComingEventsApp"]);
    }
    //if (!SP || !SP.ClientContext) {
    //    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', dwangular);
    //}
    //else {
        angular.element(document).ready(dwangular);
    //}
    
}
   


