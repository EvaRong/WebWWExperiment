/*
 * Copyright 2003-2006, 2009, 2017, United States Government, as represented by the Administrator of the
 * National Aeronautics and Space Administration. All rights reserved.
 *
 * The NASAWorldWind/WebWorldWind platform is licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Illustrates how to display and pick Placemarks.
 */
// requirejs(['./WorldWindShim',
//         './LayerManager'],
//     function (WorldWind,
//               LayerManager) {
//         "use strict";
//
//         /** Tell WorldWind to log only warnings and errors. */
//         WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);
//
//         /** Create the WorldWindow. */
//         var wwd = new WorldWind.WorldWindow("canvasOne");
//
//         /** Create and add layers to the WorldWindow. */
//         var layers = [
//             /** Imagery layers. */
//             {layer: new WorldWind.BMNGLayer(), enabled: true},
//             {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
//             {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
//             /** Add atmosphere layer on top of all base layers. */
//             {layer: new WorldWind.AtmosphereLayer(), enabled: true},
//             /** WorldWindow UI layers. */
//             {layer: new WorldWind.CompassLayer(), enabled: true},
//             {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
//             {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
//         ];
//
//         for (var l = 0; l < layers.length; l++) {
//             layers[l].layer.enabled = layers[l].enabled;
//             wwd.addLayer(layers[l].layer);
//         }
//
//         /** Define Custom Placemark */
//         var canvas = document.createElement("canvas");
//         var ctx2d = canvas.getContext("2d");
//         var size = 70, c = size / 2 - 0.5,innerRadius = 0.5, outerRadius = 10;
//
//         canvas.width = size;
//         canvas.height = size;
//
//         var gradient = ctx2d.createRadialGradient(c, c, innerRadius, c, c, outerRadius);
//         gradient.addColorStop(0, 'rgb(255, 140, 140)');
//         gradient.addColorStop(0.25, 'rgb(255, 189, 56)');
//         gradient.addColorStop(0.50, 'rgb(231, 247, 91)');
//         gradient.addColorStop(0.75, 'rgb(108, 230, 99)');
//         gradient.addColorStop(1, 'rgb(142, 118, 227)');
//
//         ctx2d.fillStyle = gradient;
//         ctx2d.arc(c, c, outerRadius, 0, 2 * Math.PI, false);
//         ctx2d.fill();
//
//         /** Set placemark attributes. */
//         var newPlacemarkAttributes = new WorldWind.PlacemarkAttributes(null);
//
//         /** Wrap the canvas created above in an ImageSource object to specify it as the placemarkAttributes image source. */
//         newPlacemarkAttributes.imageSource = new WorldWind.ImageSource(canvas);
//
//         /** Define the pivot point for the placemark at the center of its image source. */
//         newPlacemarkAttributes.imageOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 0.5);
//         newPlacemarkAttributes.imageScale = 1;
//         newPlacemarkAttributes.imageColor = WorldWind.Color.WHITE;
//
//         /** Set highlight Attributes for placemark */
//         var newHighlightAttributes = new WorldWind.PlacemarkAttributes (newPlacemarkAttributes);
//         newHighlightAttributes.imageScale = 1.25;
//
//         /** Create the placemark with the attributes defined above. */
//         var placemarkPosition = new WorldWind.Position(48.75115, 8.251525, 1e2);
//         var newPlacemark = new WorldWind.Placemark(placemarkPosition, false, newPlacemarkAttributes);
//
//         /** Draw placemark at altitude defined above, relative to the terrain. */
//         newPlacemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
//
//         /** Assign highlight Attributes for the placemark */
//         newPlacemark.highlightAttributes = newHighlightAttributes;
//
//         /** Create new Layer for Custom Placemark */
//         var placemarks = new WorldWind.RenderableLayer("Custom Placemark");
//
//         /** Add the placemark to the layer. */
//         placemarks.addRenderable(newPlacemark);
//
//         /** Add Layer to System */
//         wwd.addLayer(placemarks);
//
//
//
//         /** Define new Custom Placemark */
//
//         var newCanvas = document.createElement("canvas");
//         var newCtx2d = newCanvas.getContext("2d");
//         var newSize = 60, newC = newSize / 2 - 0.5, newInnerRadius = 0.5, newOuterRadius = 10;
//
//         newCanvas.width = newSize;
//         newCanvas.height = newSize;
//
//         var newGradient = newCtx2d.createRadialGradient(newC, newC, newInnerRadius, newC, newC, newOuterRadius);
//         newGradient.addColorStop(0, 'rgb(142, 118, 227)');
//         newGradient.addColorStop(0.25, 'rgb(108, 230, 99)');
//         newGradient.addColorStop(0.50, 'rgb(231, 247, 91)');
//         newGradient.addColorStop(0.75, 'rgb(255, 189, 56)');
//         newGradient.addColorStop(1, 'rgb(255, 140, 140)');
//
//         newCtx2d.fillStyle = newGradient;
//         newCtx2d.arc(newC, newC, newOuterRadius, 0, 2 * Math.PI, false);
//         newCtx2d.fill();
//
//
//         /** Set new placemark attributes */
//         var otherPlacemarkAttributes = new WorldWind.PlacemarkAttributes(null);
//
//         /** wrap the canvas created above in an ImageSource object to specify it as the placemarkAttributes image source */
//         otherPlacemarkAttributes.imageSource = new WorldWind.ImageSource(newCanvas);
//
//         /** Define the pivot point for the placemark at the center of its image source */
//         otherPlacemarkAttributes.imageOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 0.5);
//         otherPlacemarkAttributes.imageScale = 1;
//         otherPlacemarkAttributes.imageColor = WorldWind.Color.WHITE;
//
//         /** Set placemark highlight attributes */
//         var otherHighlightAttributes = new WorldWind.PlacemarkAttributes(otherPlacemarkAttributes);
//         otherHighlightAttributes.imageScale = 1.25;
//         /** create the placemark with the attributes defined above */
//         var otherPlacemarkPosition = new WorldWind.Position(41.451767,-74.438537, 1e2);
//         var otherPlacemark = new WorldWind.Placemark(otherPlacemarkPosition, false, otherPlacemarkAttributes);
//
//
//         /** draw placemark at altitude defined above, relative to terrain */
//         otherPlacemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
//
//         /** Assign highlight attributes for the placemark */
//         otherPlacemark.highlightAttributes = otherHighlightAttributes;
//
//         /** add placemark to layer */
//         placemarks.addRenderable(otherPlacemark);
//
//
//
//
//
//         /** Define the images we'll use for the placemarks. */
//         var images = [
//             "plain-black.png",
//             "plain-blue.png",
//             "plain-brown.png",
//             "plain-gray.png",
//             "plain-green.png",
//             "plain-orange.png",
//             "plain-purple.png",
//             "plain-red.png",
//             "plain-teal.png",
//             "plain-white.png",
//             "plain-yellow.png",
//             "castshadow-black.png",
//             "castshadow-blue.png",
//             "castshadow-brown.png",
//             "castshadow-gray.png",
//             "castshadow-green.png",
//             "castshadow-orange.png",
//             "castshadow-purple.png",
//             "castshadow-red.png",
//             "castshadow-teal.png",
//             "castshadow-white.png"
//         ];
//
//         var pinLibrary = WorldWind.configuration.baseUrl + "images/pushpins/", /** location of the image files */
//             placemark,
//             placemarkAttributes = new WorldWind.PlacemarkAttributes(null),
//             highlightAttributes,
//             placemarkLayer = new WorldWind.RenderableLayer("Placemarks"),
//             latitude = 47.684444,
//             longitude = -121.129722;
//
//         /** Set up the common placemark attributes. */
//         placemarkAttributes.imageScale = 1;
//         placemarkAttributes.imageOffset = new WorldWind.Offset(
//             WorldWind.OFFSET_FRACTION, 0.3,
//             WorldWind.OFFSET_FRACTION, 0.0);
//         placemarkAttributes.imageColor = WorldWind.Color.WHITE;
//         placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
//             WorldWind.OFFSET_FRACTION, 0.5,
//             WorldWind.OFFSET_FRACTION, 1.0);
//         placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
//         placemarkAttributes.drawLeaderLine = true;
//         placemarkAttributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;
//
//         /** For each placemark image, create a placemark with a label. */
//         for (var i = 0, len = images.length; i < len; i++) {
//             /** Create the placemark and its label. */
//             placemark = new WorldWind.Placemark(new WorldWind.Position(latitude, longitude + i, 1e2), true, null);
//             placemark.label = "Placemark " + i.toString() + "\n"
//                 + "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n"
//                 + "Lon " + placemark.position.longitude.toPrecision(5).toString();
//             placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
//
//             /** Create the placemark attributes for this placemark. Note that the attributes differ only by their
//              image URL. */
//             placemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
//             console.log(pinLibrary);
//             placemarkAttributes.imageSource = pinLibrary + images[i];
//             placemark.attributes = placemarkAttributes;
//
//             /** Create the highlight attributes for this placemark. Note that the normal attributes are specified as
//              the default highlight attributes so that all properties are identical except the image scale. You could
//              instead vary the color, image, or other property to control the highlight representation. */
//             highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
//             highlightAttributes.imageScale = 1.2;
//             placemark.highlightAttributes = highlightAttributes;
//
//             /** Add the placemark to the layer. */
//             placemarkLayer.addRenderable(placemark);
//         }
//
//         /** Add the placemarks layer to the WorldWindow's layer list. */
//         wwd.addLayer(placemarkLayer);
//
//         /** Now set up to handle picking. */
//
//         var highlightedItems = [];
//
//         /** The common pick-handling function. */
//         var handlePick = function (o) {
//             /** The input argument is either an Event or a TapRecognizer. Both have the same properties for determining
//             the mouse or tap location. */
//             var x = o.clientX,
//                 y = o.clientY;
//
//             var redrawRequired = highlightedItems.length > 0; // must redraw if we de-highlight previously picked items
//
//             /** De-highlight any previously highlighted placemarks. */
//             for (var h = 0; h < highlightedItems.length; h++) {
//                 highlightedItems[h].highlighted = false;
//                 otherPlacemark.label = "";
//             }
//             highlightedItems = [];
//
//             /** Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
//              relative to the upper left corner of the canvas rather than the upper left corner of the page. */
//             var pickList = wwd.pick(wwd.canvasCoordinates(x, y));
//             console.log(pickList.objects.length);
//
//             if (pickList.objects.length > 0) {
//
//                 console.log (pickList);
//                 console.log (pickList.objects);
//                 redrawRequired = true;
//             }
//
//             /** Highlight the items picked by simply setting their highlight flag to true. */
//             if (pickList.objects.length > 0) {
//                 for (var p = 0; p < pickList.objects.length; p++) {
//
//                     console.log(pickList.objects[p].userObject instanceof WorldWind.Placemark);
//
//                     /** Detect whether the placemark's label was picked. If so, the "labelPicked" property is true.
//                      * If instead the user picked the placemark's image, the "labelPicked" property is false.
//                      * Applications might use this information to determine whether the user wants to edit the label
//                      * or is merely picking the placemark as a whole. */
//
//                     if (pickList.objects[p].labelPicked) {
//                         console.log("Label picked");
//                     }
//                     console.log(pickList.objects[p].userObject.highlighted);
//
//                     if(pickList.objects[0].position.latitude === 41.451767){
//                         pickList.objects[p].userObject.highlighted = true;
//                         /** otherPlacemark.label = "Hello"; */
//                         console.log(pickList.objects[0]);
//                         /** alert("I'm showing you this, because you clicked on me."); */
//                     }
//
//                     console.log(pickList.objects[p].userObject);
//
//                     /** Keep track of highlighted items in order to de-highlight them later. */
//                     highlightedItems.push(pickList.objects[p].userObject);
//                  }
//             }
//             /**Update the window if we changed anything.*/
//             if (redrawRequired) {
//                 wwd.redraw(); /** redraw to make the highlighting changes take effect on the screen */
//             }
//         };
//
//         var newHighlightedItems = [];
//
//         var newHandlePick =  function (o) {
//             var newX = o.clientX,
//                 newY = o.clientY;
//
//             var newRedrawRequired = newHighlightedItems.length > 0;
//             console.log(newHighlightedItems);
//
//             for (var newH = 0; newH < newHighlightedItems.length; newH++){
//                 newHighlightedItems[newH].highlighted = false;
//                 newPlacemark.label = "";
//             }
//             newHighlightedItems = [];
//
//             var newPickList = wwd.pick(wwd.canvasCoordinates(newX, newY));
//
//             if (newPickList.objects.length > 0) {
//                 /**console.log (newPickList);
//                  * console.log (newPickList.objects); */
//                 newRedrawRequired = true;
//
//                 for (var newP = 0; newP < newPickList.objects.length; newP++) {
//
//                     if(newPickList.objects[0].position.latitude === 48.75115){
//                         newPickList.objects[newP].userObject.highlighted = true;
//                         /** newPlacemark.label = "Bye"; */
//                         console.log(newPickList.objects[0]);
//                         /**alert("I'm showing you this, because you moved your mouse over me."); */
//                     }
//
//                     newHighlightedItems.push(newPickList.objects[newP].userObject);
//                 }
//             }
//
//
//             if (newRedrawRequired) {
//                 wwd.redraw();
//             }
//
//
//         };
//
//
//
//         <!--- Listen for mouse moves and highlight the placemarks that the cursor rolls over.-->
//         wwd.addEventListener("mousemove", newHandlePick);
//         wwd.addEventListener("click", handlePick);
//
//
//         <!--- Listen for taps on mobile devices and highlight the placemarks that the user taps.-->
//         var tapRecognizer = new WorldWind.TapRecognizer(wwd, handlePick);
//
//         <!--- Create a layer manager for controlling layer visibility. -->
//         var layerManager = new LayerManager(wwd);
//     });