diff --git a/chrome/browser/resources/settings/route.ts b/chrome/browser/resources/settings/route.ts
index 2458ecb3791b0..3bb241e79a8b2 100644
--- a/chrome/browser/resources/settings/route.ts
+++ b/chrome/browser/resources/settings/route.ts
@@ -183,6 +183,9 @@ function createRoutes(): SettingsRoutes {
   // Root pages.
   r.BASIC = new Route('/');
   r.ABOUT = new Route('/help', loadTimeData.getString('aboutPageTitle'));
+  r.BrowserGenie = new Route('/browsergenie-ai', 'BrowserGenie AI Settings');
+  r.BrowserGenie = new Route('/BrowserGenie', 'BrowserGenie');
+  r.BrowserGenie_PREFS = new Route('/BrowserGenie-settings', 'BrowserGenie Settings');
 
   r.SEARCH = r.BASIC.createSection(
       '/search', 'search', loadTimeData.getString('searchPageTitle'));
