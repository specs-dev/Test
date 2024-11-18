(function(){
    var script = {
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_25CB7DB2_3EC6_79AE_41B7_6497A903B317], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); this.playList_1E76CE6D_3EC6_1ABB_41CB_C2554169875A.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_25CB2DB2_3EC6_79AE_41C4_1B25AAA398C0].forEach(function(component) { component.set('visible', false); }) }",
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 1,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "desktopMipmappingEnabled": false,
 "mouseWheelEnabled": true,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.MainViewer",
  "this.Container_7F59BED9_7065_6DCD_41D6_B4AD3EEA9174",
  "this.Container_062AB830_1140_E215_41AF_6C9D65345420",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.MapViewer",
  "this.Container_25CADDB2_3EC6_79AE_41A8_6E606C53F177"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "backgroundPreloadEnabled": true,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 20,
 "defaultVRPointer": "laser",
 "buttonToggleFullscreen": "this.IconButton_25CB2DB2_3EC6_79AE_41C4_1B25AAA398C0",
 "scripts": {
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "registerKey": function(key, value){  window[key] = value; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "existsKey": function(key){  return key in window; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "unregisterKey": function(key){  delete window[key]; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getKey": function(key){  return window[key]; }
 },
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "buttonToggleMute": "this.IconButton_25CB0DB2_3EC6_79AE_41CE_430D2B90E534",
 "downloadEnabled": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "shadow": false,
 "class": "Player",
 "data": {
  "name": "Player468"
 },
 "overflow": "visible",
 "definitions": [{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": -106.06,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1E885EC2_3EC6_1BEE_41BA_972EC14878CC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 66.55,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_229161F5_3EC6_29AA_41C5_B386FEECDC62"
},
{
 "class": "PanoramaPlayer",
 "buttonCardboardView": "this.IconButton_25CB5DB2_3EC6_79AE_419C_838D5EB0FC21",
 "buttonToggleHotspots": "this.IconButton_25CB1DB2_3EC6_79AE_4182_D3422EDDDC4E",
 "viewerArea": "this.MainViewer",
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_25CB7DB2_3EC6_79AE_41B7_6497A903B317",
 "mouseControlMode": "drag_acceleration"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 95.04,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1FA33073_3EC6_26AE_41CE_BABD88801972"
},
{
 "class": "PlayList",
 "items": [
  "this.PanoramaPlayListItem_1E585E82_3EC6_1A69_4153_147AE11EDABA",
  "this.PanoramaPlayListItem_1E5B9E83_3EC6_1A6F_41C6_2843FE447D07",
  "this.PanoramaPlayListItem_1E5B3E88_3EC6_1A79_41CB_14E6A3D65E80",
  "this.PanoramaPlayListItem_1E5ABE89_3EC6_1A7B_41B2_AACF91177FE8",
  "this.PanoramaPlayListItem_1E5A2E89_3EC6_1A7B_41CC_93DF34C21F37",
  "this.PanoramaPlayListItem_1E5D4E89_3EC6_1A7B_41B6_3829F36DFBA0",
  "this.PanoramaPlayListItem_1E5CEE8A_3EC6_1A79_41CE_36DF2625394E",
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_95857EB1_992D_0A04_41B1_25074D224AFF_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "media": "this.panorama_95857EB1_992D_0A04_41B1_25074D224AFF",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "media": "this.panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "media": "this.panorama_92B5EB5A_992D_0A04_4196_9331249D9F48",
   "player": "this.MainViewerPanoramaPlayer"
  },
  "this.PanoramaPlayListItem_1E5ECE8A_3EC6_1A79_41B9_BC9C0A1EC8EF",
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "media": "this.panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "media": "this.panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "media": "this.panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "media": "this.panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "media": "this.panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "media": "this.panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "media": "this.panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "media": "this.panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "media": "this.panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "media": "this.panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "media": "this.panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "media": "this.panorama_BA09F476_B77A_FBBC_41B4_317C6928F125",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PhotoAlbumPlayListItem",
   "end": "this.trigger('tourEnded')",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 0)",
   "media": "this.album_A9E00199_B7F5_BD74_41DF_43A611899DA6",
   "player": "this.MainViewerPhotoAlbumPlayer"
  }
 ],
 "id": "mainPlayList"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 169.41,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1F116008_3EC6_2679_41BC_5F13FD276651"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -94.11,
   "backwardYaw": 93.16,
   "distance": 1,
   "panorama": "this.panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BA09F476_B77A_FBBC_41B4_317C6928F125"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 171.33,
   "backwardYaw": -111.56,
   "distance": 1,
   "panorama": "this.panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4"
  }
 ],
 "hfov": 360,
 "label": "Corridor",
 "id": "panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4",
 "thumbnailUrl": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_A4C1C07F_B78B_FBAD_41C6_5EE57117D445",
  "this.overlay_A4089FBE_B796_A4AC_41B7_D2496C7403C9",
  "this.overlay_A3EFFF56_B79E_65FC_41A0_99BF01026E4D"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": -22.9,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_22BAB168_3EC6_26B9_41C6_B6D193AB27C7"
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "VideoPlayListItem",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_1E590E82_3EC6_1A69_41B6_6A139FCCB902, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_1E590E82_3EC6_1A69_41B6_6A139FCCB902, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "media": "this.video_2FEDDCE9_3D4E_FFBB_41A5_752566D6CB5C",
   "player": "this.MainViewerVideoPlayer"
  }
 ],
 "id": "playList_1E590E82_3EC6_1A69_41B6_6A139FCCB902"
},
{
 "class": "Video",
 "label": "vecteezy_mobile-phone-rotation-animation-on-black-background_35622867",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_2FEDDCE9_3D4E_FFBB_41A5_752566D6CB5C_t.jpg",
 "width": 1920,
 "loop": false,
 "id": "video_2FEDDCE9_3D4E_FFBB_41A5_752566D6CB5C",
 "height": 1080,
 "video": {
  "width": 1920,
  "class": "VideoResource",
  "height": 1080,
  "mp4Url": "media/video_2FEDDCE9_3D4E_FFBB_41A5_752566D6CB5C.mp4"
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -137.57,
   "backwardYaw": 103.61,
   "distance": 1,
   "panorama": "this.panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4"
  }
 ],
 "hfov": 360,
 "label": "2nd Floor Guest Room",
 "id": "panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B",
 "thumbnailUrl": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_AFF689BA_B7BA_ECB4_41DE_431EADC01119"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 178.86,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1FF430DD_3EC6_279A_41BB_D27BD8CFC9CB"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 44.82,
   "backwardYaw": -84.96,
   "distance": 1,
   "panorama": "this.panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -176.64,
   "backwardYaw": 47.46,
   "distance": 1,
   "panorama": "this.panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA"
  }
 ],
 "hfov": 360,
 "label": "Drop Off",
 "id": "panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E",
 "thumbnailUrl": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_t.jpg"
  }
 ],
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_8777A049_99D1_7C60_41D5_A407F70F7A62",
   "class": "PanoramaMapLocation",
   "angle": 256.05,
   "y": 603.77,
   "x": 663.03
  }
 ],
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_BA2F9D25_B77A_A55D_419A_E48A7AC7BDDA",
  "this.overlay_BA2FED25_B77A_A55D_41C8_4ACBFFE31C59",
  "this.overlay_B88882E2_B77E_7CD4_41E2_924C08FBDE05"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 176.46,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1FEFD0C4_3EC6_27EA_4183_B3C9AD5EDB02"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": -0.19,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1ED6FFAA_3EC6_19BE_419B_E1508FD1C45D"
},
{
 "class": "Photo",
 "duration": 0,
 "id": "album_A9E00199_B7F5_BD74_41DF_43A611899DA6_2",
 "thumbnailUrl": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_2_t.png",
 "width": 3308,
 "label": "EBROSUR_-03",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_2.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 2339
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 103.61,
   "backwardYaw": -137.57,
   "distance": 1,
   "panorama": "this.panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 74.97,
   "backwardYaw": -87.2,
   "distance": 1,
   "panorama": "this.panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4",
 "thumbnailUrl": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_t.jpg",
 "label": "2nd Floor Office",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_A006E84D_B7B6_6BEC_41AE_3C1A36E6929E",
  "this.overlay_AF96FB3F_B7BA_ADAC_41C5_282AEF172743"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -113.45,
   "backwardYaw": 50.47,
   "distance": 1,
   "panorama": "this.panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -91.09,
   "backwardYaw": 158.52,
   "distance": 1,
   "panorama": "this.panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 73.94,
   "backwardYaw": -106.92,
   "distance": 1,
   "panorama": "this.panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8"
  }
 ],
 "hfov": 360,
 "label": "3nd Floor Office",
 "id": "panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22",
 "thumbnailUrl": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_AED1A215_B78A_BF7C_41E3_14DF19B45E47",
  "this.overlay_AE1FFFC4_B78A_A4D3_41E0_3BE900C570DE",
  "this.overlay_98BE1C6D_B88D_ABAC_41D8_3D950D154478"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": -179.87,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1F203FD2_3EC6_19E9_41AE_A727B630FE23"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 92.8,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1F562067_3EC6_26B6_41B1_8F8E07BBE6D8"
},
{
 "class": "Photo",
 "duration": 5000,
 "id": "album_809676CC_9425_DA9A_41B5_DD15E74A778F_3",
 "thumbnailUrl": "media/album_809676CC_9425_DA9A_41B5_DD15E74A778F_3_t.png",
 "width": 1920,
 "label": "Entry Gate",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_809676CC_9425_DA9A_41B5_DD15E74A778F_3.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1080
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": -135.18,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1FFB30D0_3EC6_27EA_41BE_E2A27F331A62"
},
{
 "class": "Photo",
 "duration": 0,
 "id": "album_A9E00199_B7F5_BD74_41DF_43A611899DA6_12",
 "thumbnailUrl": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_12_t.png",
 "width": 3308,
 "label": "EBROSUR_-13",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_12.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 2339
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 158.52,
   "backwardYaw": -91.09,
   "distance": 1,
   "panorama": "this.panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22"
  }
 ],
 "hfov": 360,
 "label": "3nd Floor Meeting Room",
 "id": "panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214",
 "thumbnailUrl": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_98072FEC_B88D_A4D3_41D7_F4EA1E2FB393"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -178.52,
   "backwardYaw": -1.14,
   "distance": 1,
   "panorama": "this.panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.14,
   "backwardYaw": -178.25,
   "distance": 1,
   "panorama": "this.panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60"
  }
 ],
 "hfov": 360,
 "label": "C Block",
 "id": "panorama_BA44459A_B775_E574_41C9_23F7475E5DA0",
 "thumbnailUrl": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_t.jpg"
  }
 ],
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_8777A049_99D1_7C60_41D5_A407F70F7A62",
   "class": "PanoramaMapLocation",
   "angle": 257.82,
   "y": 409.16,
   "x": 388.47
  }
 ],
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_BA44759A_B775_E574_41D4_FB74D2003AC5",
  "this.overlay_BA44059A_B775_E574_41CE_E29B4D10B3B7"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": -156.43,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_22B53197_3EC6_2997_41B0_572B90BFA65E"
},
{
 "fieldOfViewOverlayOutsideOpacity": 0,
 "label": "EBROSUR_-13",
 "id": "map_8777A049_99D1_7C60_41D5_A407F70F7A62",
 "minimumZoomFactor": 1,
 "thumbnailUrl": "media/map_8777A049_99D1_7C60_41D5_A407F70F7A62_t.jpg",
 "width": 1240,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_8777A049_99D1_7C60_41D5_A407F70F7A62.jpeg",
    "class": "ImageResourceLevel",
    "width": 1240,
    "height": 877
   },
   {
    "url": "media/map_8777A049_99D1_7C60_41D5_A407F70F7A62_lq.jpeg",
    "class": "ImageResourceLevel",
    "width": 304,
    "height": 216,
    "tags": "preload"
   }
  ]
 },
 "fieldOfViewOverlayRadiusScale": 0.13,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "maximumZoomFactor": 1,
 "class": "Map",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "scaleMode": "fit_outside",
 "initialZoomFactor": 1,
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "height": 877,
 "overlays": [
  "this.overlay_96A47E0A_9996_FED5_41E1_FD36A9EAED0E",
  "this.overlay_96C4676B_9991_AD2B_41E1_3A983D483977",
  "this.overlay_8913E19A_9991_A5F5_41D7_EDA39D2721BC",
  "this.overlay_897C46C3_999F_AF5B_41B3_B4C9BA1B553B",
  "this.overlay_962AC8F8_999E_A335_41C1_5877B03B6346",
  "this.overlay_896518D5_9992_637F_41DB_E54BD934C20B",
  "this.overlay_88F34F9D_9991_BDEF_41C3_F50909816221",
  "this.overlay_8BB91ED3_99B1_9F7B_41B3_7AF57E433679"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 93.16,
   "backwardYaw": -94.11,
   "distance": 1,
   "panorama": "this.panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -3.54,
   "backwardYaw": -168.62,
   "distance": 1,
   "panorama": "this.panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 94.44,
   "backwardYaw": 75.95,
   "distance": 1,
   "panorama": "this.panorama_BA09F476_B77A_FBBC_41B4_317C6928F125"
  }
 ],
 "hfov": 360,
 "label": "Front Desk 2",
 "id": "panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A",
 "thumbnailUrl": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_A66920A7_B78A_DB5C_41E0_5A747FC14E65",
  "this.overlay_A5ADCC84_B78D_AB53_41E0_B6C26B71A8BD",
  "this.overlay_A51B4F0E_B78E_A56F_4191_F28EEB1E4C65"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 89.27,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_2297B201_3EC6_2A6A_41CF_0961D5334CD4"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": -85.56,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_229D61D4_3EC6_29EA_41B9_F7CF39138BC5"
},
{
 "class": "Photo",
 "duration": 0,
 "id": "album_A9E00199_B7F5_BD74_41DF_43A611899DA6_3",
 "thumbnailUrl": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_3_t.png",
 "width": 3308,
 "label": "EBROSUR_-04",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_3.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 2339
},
{
 "class": "FadeInEffect",
 "duration": 500,
 "id": "effect_B43C1B6A_9425_CB9E_41BF_EAB77416D59A",
 "easing": "quad_in"
},
{
 "class": "PhotoAlbumPlayer",
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPhotoAlbumPlayer",
 "buttonPrevious": "this.IconButton_ABAE6D7A_B78F_E5B7_41D3_93A520575A96",
 "buttonNext": "this.IconButton_ABAE7D7A_B78F_E5B7_41E0_6B4DB6A26A06"
},
{
 "class": "Photo",
 "duration": 0,
 "id": "album_A9E00199_B7F5_BD74_41DF_43A611899DA6_7",
 "thumbnailUrl": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_7_t.png",
 "width": 3308,
 "label": "EBROSUR_-08",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_7.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 2339
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 1.72,
   "backwardYaw": -178.4,
   "distance": 1,
   "panorama": "this.panorama_95857EB1_992D_0A04_41B1_25074D224AFF"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -90.73,
   "backwardYaw": 179.81,
   "distance": 1,
   "panorama": "this.panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 89.4,
   "backwardYaw": 0.13,
   "distance": 1,
   "panorama": "this.panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5"
  }
 ],
 "hfov": 360,
 "label": "Basement Entry",
 "id": "panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA",
 "thumbnailUrl": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_t.jpg"
  }
 ],
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_8777A049_99D1_7C60_41D5_A407F70F7A62",
   "class": "PanoramaMapLocation",
   "angle": -14.66,
   "y": 744.5,
   "x": 397.56
  }
 ],
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_BA2DE7C4_B77A_64DC_41D7_4DA02028272D",
  "this.overlay_BA2E07C4_B77A_64DC_41D4_750320C26F4C",
  "this.overlay_BA2E37C4_B77A_64DC_41C8_8AA03065FE3E"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_camera"
},
{
 "class": "PlayList",
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "class": "MapPlayListItem",
   "media": "this.map_8777A049_99D1_7C60_41D5_A407F70F7A62",
   "player": "this.MapViewerMapPlayer"
  }
 ],
 "id": "playList_1E76CE6D_3EC6_1ABB_41CB_C2554169875A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 88.91,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1E92BF0E_3EC6_1A76_41AE_C06C19C08443"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 81.52,
   "backwardYaw": -88.55,
   "distance": 1,
   "panorama": "this.panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 0.13,
   "backwardYaw": 89.4,
   "distance": 1,
   "panorama": "this.panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 47.46,
   "backwardYaw": -176.64,
   "distance": 1,
   "panorama": "this.panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E"
  }
 ],
 "hfov": 360,
 "label": "Entry Gate",
 "id": "panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5",
 "thumbnailUrl": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_t.jpg"
  }
 ],
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_8777A049_99D1_7C60_41D5_A407F70F7A62",
   "class": "PanoramaMapLocation",
   "angle": 257.15,
   "y": 625.72,
   "x": 892.07
  }
 ],
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_BA3F11DE_B77A_5CEC_41DB_3031440B850F",
  "this.overlay_BA3F41DE_B77A_5CEC_41E2_C27FDB8EF893",
  "this.overlay_BA3F51DE_B77A_5CEC_41E2_93D15DCD6563"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_camera"
},
{
 "class": "Photo",
 "duration": 5000,
 "id": "album_809676CC_9425_DA9A_41B5_DD15E74A778F_1",
 "thumbnailUrl": "media/album_809676CC_9425_DA9A_41B5_DD15E74A778F_1_t.png",
 "width": 1920,
 "label": "C Block-1",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_809676CC_9425_DA9A_41B5_DD15E74A778F_1.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1080
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 1.48,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1EFE1F4C_3EC6_1AFA_41C4_33B0A94AA125"
},
{
 "class": "Photo",
 "duration": 0,
 "id": "album_A9E00199_B7F5_BD74_41DF_43A611899DA6_1",
 "thumbnailUrl": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_1_t.png",
 "width": 3308,
 "label": "EBROSUR_-02",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_1.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 2339
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -1.91,
   "backwardYaw": 23.57,
   "distance": 1,
   "panorama": "this.panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -87.2,
   "backwardYaw": 74.97,
   "distance": 1,
   "panorama": "this.panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 26.33,
   "backwardYaw": -12.21,
   "distance": 1,
   "panorama": "this.panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556",
 "thumbnailUrl": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_t.jpg",
 "label": "2nd Floor Stairs",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_A1DBFDC1_B78B_A4D4_418F_7C44507C57E6",
  "this.overlay_A1CDF69A_B78D_A777_41E2_084F400AC3CF",
  "this.overlay_A2487C28_B78A_6B54_41D8_3865F1CD5AE1"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_camera"
},
{
 "class": "Photo",
 "duration": 5000,
 "id": "album_809676CC_9425_DA9A_41B5_DD15E74A778F_5",
 "thumbnailUrl": "media/album_809676CC_9425_DA9A_41B5_DD15E74A778F_5_t.png",
 "width": 1920,
 "label": "Front View",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_809676CC_9425_DA9A_41B5_DD15E74A778F_5.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1080
},
{
 "class": "SlideInEffect",
 "duration": 500,
 "id": "effect_8B55582A_9422_359E_41B0_E759C423708C",
 "easing": "quad_out",
 "from": "left"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 178.86,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1EECBF20_3EC6_1AAA_41A8_D487CF4DD459"
},
{
 "class": "PhotoAlbum",
 "label": "Photo Album Bird View",
 "id": "album_809676CC_9425_DA9A_41B5_DD15E74A778F",
 "thumbnailUrl": "media/album_809676CC_9425_DA9A_41B5_DD15E74A778F_t.png",
 "playList": "this.album_809676CC_9425_DA9A_41B5_DD15E74A778F_AlbumPlayList"
},
{
 "class": "Photo",
 "duration": 0,
 "id": "album_A9E00199_B7F5_BD74_41DF_43A611899DA6_4",
 "thumbnailUrl": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_4_t.png",
 "width": 3308,
 "label": "EBROSUR_-05",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_4.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 2339
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0.34,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1E9ADEF8_3EC6_1B9A_41C5_7CA443FDA8EC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": -8.67,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_22E1421B_3EC6_2A9E_4191_B84FB70AD6BD"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 1.8,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_22BE518B_3EC6_267F_41AB_5F66B9EB64CE"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 75.95,
   "backwardYaw": 94.44,
   "distance": 1,
   "panorama": "this.panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A"
  }
 ],
 "hfov": 360,
 "label": "Meeting Room",
 "id": "panorama_BA09F476_B77A_FBBC_41B4_317C6928F125",
 "thumbnailUrl": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_A49C0EBF_B78A_A4AC_41D0_D7BFA97E00DB"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 68.44,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1F093FEE_3EC6_19B9_41CE_98C07FBCFFFE"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -168.62,
   "backwardYaw": -3.54,
   "distance": 1,
   "panorama": "this.panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -84.96,
   "backwardYaw": 44.82,
   "distance": 1,
   "panorama": "this.panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E"
  }
 ],
 "hfov": 360,
 "label": "Front Desk 1",
 "id": "panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5",
 "thumbnailUrl": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_A64E3FAF_B775_A4AC_41E0_66FBF99B9F53",
  "this.overlay_A619580A_B78A_AB54_419A_E36F24FFB927"
 ]
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "media": "this.panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "media": "this.panorama_BA44459A_B775_E574_41C9_23F7475E5DA0",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "media": "this.panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "media": "this.panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "media": "this.panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "media": "this.panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 7)",
   "media": "this.panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_95857EB1_992D_0A04_41B1_25074D224AFF_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 7, 8)",
   "media": "this.panorama_95857EB1_992D_0A04_41B1_25074D224AFF",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 8, 9)",
   "media": "this.panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 9, 10)",
   "media": "this.panorama_92B5EB5A_992D_0A04_4196_9331249D9F48",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 10, 11)",
   "media": "this.panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 11, 12)",
   "media": "this.panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 12, 13)",
   "media": "this.panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 13, 14)",
   "media": "this.panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 14, 15)",
   "media": "this.panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 15, 16)",
   "media": "this.panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 16, 17)",
   "media": "this.panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 17, 18)",
   "media": "this.panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 18, 19)",
   "media": "this.panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 19, 20)",
   "media": "this.panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 20, 21)",
   "media": "this.panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 21, 22)",
   "media": "this.panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 22, 0)",
   "media": "this.panorama_BA09F476_B77A_FBBC_41B4_317C6928F125",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist"
},
{
 "class": "Photo",
 "duration": 0,
 "id": "album_A9E00199_B7F5_BD74_41DF_43A611899DA6_10",
 "thumbnailUrl": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_10_t.png",
 "width": 3308,
 "label": "EBROSUR_-11",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_10.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 2339
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -111.56,
   "backwardYaw": 171.33,
   "distance": 1,
   "panorama": "this.panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 23.57,
   "backwardYaw": -1.91,
   "distance": 1,
   "panorama": "this.panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556"
  }
 ],
 "hfov": 360,
 "label": "1st Floor Stairs",
 "id": "panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4",
 "thumbnailUrl": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_A19B32F7_B79B_DCBD_41C5_BADAB1DAF30A",
  "this.overlay_9930C3BF_B897_BCAC_41C0_C671D7ADE6BC"
 ]
},
{
 "class": "Photo",
 "duration": 5000,
 "id": "album_809676CC_9425_DA9A_41B5_DD15E74A778F_6",
 "thumbnailUrl": "media/album_809676CC_9425_DA9A_41B5_DD15E74A778F_6_t.png",
 "width": 1920,
 "label": "Side View 2",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_809676CC_9425_DA9A_41B5_DD15E74A778F_6.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1080
},
{
 "class": "VideoPlayer",
 "viewerArea": "this.MainViewer",
 "id": "MainViewerVideoPlayer",
 "displayPlaybackBar": true
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 85.89,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1F8BC08C_3EC6_267A_4191_DA684E75E703"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 1.75,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1EE40F37_3EC6_1A96_41B8_8B7E3C06C754"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -178.25,
   "backwardYaw": -1.14,
   "distance": 1,
   "panorama": "this.panorama_BA44459A_B775_E574_41C9_23F7475E5DA0"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -84.53,
   "backwardYaw": 157.1,
   "distance": 1,
   "panorama": "this.panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC"
  }
 ],
 "hfov": 360,
 "label": "Exit Gate",
 "id": "panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60",
 "thumbnailUrl": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_t.jpg"
  }
 ],
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_8777A049_99D1_7C60_41D5_A407F70F7A62",
   "class": "PanoramaMapLocation",
   "angle": 263.03,
   "y": 456.7,
   "x": 182.45
  }
 ],
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_BA3351C8_B775_BCD3_41D3_1B55236FAFBA",
  "this.overlay_BA32B1C9_B775_BCD5_41D9_01A7BFFFB631"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 73.08,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1F75A042_3EC6_26EE_41AE_3202602939FE"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 50.47,
   "backwardYaw": -113.45,
   "distance": 1,
   "panorama": "this.panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22"
  }
 ],
 "hfov": 360,
 "label": "3nd Floor Guest Room",
 "id": "panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5",
 "thumbnailUrl": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_A8120C1D_B775_AB6D_41C3_43B647EFD0BB"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": -178.28,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_2286F1C7_3EC6_29F6_4190_E55CC6AC8C0D"
},
{
 "class": "Photo",
 "duration": 5000,
 "id": "album_809676CC_9425_DA9A_41B5_DD15E74A778F_4",
 "thumbnailUrl": "media/album_809676CC_9425_DA9A_41B5_DD15E74A778F_4_t.png",
 "width": 1920,
 "label": "Front View 2",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_809676CC_9425_DA9A_41B5_DD15E74A778F_4.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1080
},
{
 "class": "Photo",
 "duration": 0,
 "id": "album_A9E00199_B7F5_BD74_41DF_43A611899DA6_6",
 "thumbnailUrl": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_6_t.png",
 "width": 3308,
 "label": "EBROSUR_-07",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_6.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 2339
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 95.47,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_22EB420E_3EC6_2A76_41C9_20CBA2926FE2"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 42.43,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1F5A905B_3EC6_269E_41B7_88D11119E10A"
},
{
 "class": "PlayList",
 "items": [
  {
   "begin": "this.loopAlbum(this.playList_1E7E8E6C_3EC6_1AB9_41A4_9581A274292B, 0)",
   "class": "PhotoAlbumPlayListItem",
   "media": "this.album_A9E00199_B7F5_BD74_41DF_43A611899DA6",
   "player": "this.ViewerAreaLabeled_ABAE4D7A_B78F_E5B7_41DC_DEBF72A7639CPhotoAlbumPlayer"
  }
 ],
 "id": "playList_1E7E8E6C_3EC6_1AB9_41A4_9581A274292B"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -1.14,
   "backwardYaw": -178.52,
   "distance": 1,
   "panorama": "this.panorama_BA44459A_B775_E574_41C9_23F7475E5DA0"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -88.55,
   "backwardYaw": 81.52,
   "distance": 1,
   "panorama": "this.panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -178.2,
   "backwardYaw": -1.54,
   "distance": 1,
   "panorama": "this.panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741"
  }
 ],
 "hfov": 360,
 "label": "Entry Gate Dalam",
 "id": "panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558",
 "thumbnailUrl": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_t.jpg"
  }
 ],
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_8777A049_99D1_7C60_41D5_A407F70F7A62",
   "class": "PanoramaMapLocation",
   "angle": 256.5,
   "y": 307.94,
   "x": 816.56
  }
 ],
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_84F9FD2B_9426_4F9F_41DD_CD562ED0DB72",
  "this.overlay_855CB242_9426_5589_41B7_ADB20A3A4A45",
  "this.overlay_867E23A7_9426_7A96_41B8_6BA47D07DF2D"
 ]
},
{
 "class": "Photo",
 "duration": 0,
 "id": "album_A9E00199_B7F5_BD74_41DF_43A611899DA6_13",
 "thumbnailUrl": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_13_t.png",
 "width": 3308,
 "label": "EBROSUR_-14",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_13.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 2339
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 179.81,
   "backwardYaw": -90.73,
   "distance": 1,
   "panorama": "this.panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 157.1,
   "backwardYaw": -84.53,
   "distance": 1,
   "panorama": "this.panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60"
  }
 ],
 "hfov": 360,
 "label": "T Section",
 "id": "panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC",
 "thumbnailUrl": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_t.jpg"
  }
 ],
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_8777A049_99D1_7C60_41D5_A407F70F7A62",
   "class": "PanoramaMapLocation",
   "angle": -120.43,
   "y": 809.66,
   "x": 182.45
  }
 ],
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_BA9C2B56_B776_6DFF_41E6_3788094930B7",
  "this.overlay_BA9C7B56_B776_6DFF_41D0_77BDDBF5DA2E"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 1.6,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1EDFCF98_3EC6_199A_41B2_56E84137D8C9"
},
{
 "class": "Photo",
 "duration": 0,
 "id": "album_A9E00199_B7F5_BD74_41DF_43A611899DA6_9",
 "thumbnailUrl": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_9_t.png",
 "width": 3308,
 "label": "EBROSUR_-10",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_9.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 2339
},
{
 "class": "Photo",
 "duration": 0,
 "id": "album_A9E00199_B7F5_BD74_41DF_43A611899DA6_0",
 "thumbnailUrl": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_0_t.png",
 "width": 3308,
 "label": "EBROSUR_-01",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_0.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 2339
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 177.2,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_2282A1BB_3EC6_299E_41A4_C27250EFC1F8"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_camera"
},
{
 "class": "Photo",
 "duration": 5000,
 "id": "album_809676CC_9425_DA9A_41B5_DD15E74A778F_7",
 "thumbnailUrl": "media/album_809676CC_9425_DA9A_41B5_DD15E74A778F_7_t.png",
 "width": 1920,
 "label": "Side View",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_809676CC_9425_DA9A_41B5_DD15E74A778F_7.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1080
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -2.8,
   "backwardYaw": 88.65,
   "distance": 1,
   "panorama": "this.panorama_95857EB1_992D_0A04_41B1_25074D224AFF"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -179.66,
   "backwardYaw": -10.59,
   "distance": 1,
   "panorama": "this.panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13"
  }
 ],
 "hfov": 360,
 "label": "Basement 3",
 "id": "panorama_92B5EB5A_992D_0A04_4196_9331249D9F48",
 "thumbnailUrl": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_88D9F441_9930_8460_41E0_07C105618EF6",
  "this.overlay_8D35E7C4_9937_8461_41E1_A5EF2BFAC575"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": -129.53,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1F6CE014_3EC6_2669_41A7_4659F23D8D3F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": -21.48,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1F662020_3EC6_26A9_41C0_104864A4968E"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_95857EB1_992D_0A04_41B1_25074D224AFF_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -1.54,
   "backwardYaw": -178.2,
   "distance": 1,
   "panorama": "this.panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558"
  }
 ],
 "hfov": 360,
 "label": "C Block End",
 "id": "panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741",
 "thumbnailUrl": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_t.jpg"
  }
 ],
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_8777A049_99D1_7C60_41D5_A407F70F7A62",
   "class": "PanoramaMapLocation",
   "angle": 253.65,
   "y": 259.34,
   "x": 1014.49
  }
 ],
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_BA2809CB_B775_ACD4_41E6_A6864DFC77A0"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 136.62,
  "pitch": -6.13
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": -86.84,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1F3D5FE2_3EC6_19A9_41CE_0792BE3903D7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 167.79,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_228C01AF_3EC6_29B6_41C5_8B42E1A8AD21"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": -132.54,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1FBEA080_3EC6_266A_41A3_39BC29E307CE"
},
{
 "class": "SlideOutEffect",
 "duration": 500,
 "id": "effect_B772AD42_9426_4F8E_41D5_461A72C9274D",
 "easing": "quad_out",
 "to": "left"
},
{
 "class": "PhotoAlbumPlayer",
 "viewerArea": "this.ViewerAreaLabeled_ABAE4D7A_B78F_E5B7_41DC_DEBF72A7639C",
 "id": "ViewerAreaLabeled_ABAE4D7A_B78F_E5B7_41DC_DEBF72A7639CPhotoAlbumPlayer",
 "buttonPrevious": "this.IconButton_ABAE6D7A_B78F_E5B7_41D3_93A520575A96",
 "buttonNext": "this.IconButton_ABAE7D7A_B78F_E5B7_41E0_6B4DB6A26A06"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_camera"
},
{
 "class": "MapPlayer",
 "viewerArea": "this.MapViewer",
 "id": "MapViewerMapPlayer",
 "movementMode": "constrained"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 3.36,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_22C8425A_3EC6_2A9E_41C8_FFCFA1B4193F"
},
{
 "class": "Photo",
 "duration": 5000,
 "id": "album_809676CC_9425_DA9A_41B5_DD15E74A778F_2",
 "thumbnailUrl": "media/album_809676CC_9425_DA9A_41B5_DD15E74A778F_2_t.png",
 "width": 1920,
 "label": "C Block-2",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_809676CC_9425_DA9A_41B5_DD15E74A778F_2.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1080
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 88.65,
   "backwardYaw": -2.8,
   "distance": 1,
   "panorama": "this.panorama_92B5EB5A_992D_0A04_4196_9331249D9F48"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -178.4,
   "backwardYaw": 1.72,
   "distance": 1,
   "panorama": "this.panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA"
  }
 ],
 "hfov": 360,
 "label": "Basement 1",
 "id": "panorama_95857EB1_992D_0A04_41B1_25074D224AFF",
 "thumbnailUrl": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_88F81F23_9930_8420_41DB_DCFAA52E2A26",
  "this.overlay_8A1B398D_9931_8CE3_41CE_682ADDF8D90B"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_camera"
},
{
 "class": "PlayList",
 "items": [
  {
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem",
   "media": "this.album_809676CC_9425_DA9A_41B5_DD15E74A778F"
  }
 ],
 "id": "playList_1E594E82_3EC6_1A69_41A5_4E66BCEA1C6A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.09,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_22E6B227_3EC6_2AB6_4161_E72A00EC92D6"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -105.03,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_228971A4_3EC6_29A9_4182_1715D93F1A32"
},
{
 "class": "PhotoAlbum",
 "label": "Photo Album EBROSUR_-01",
 "id": "album_A9E00199_B7F5_BD74_41DF_43A611899DA6",
 "thumbnailUrl": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_t.png",
 "playList": "this.album_A9E00199_B7F5_BD74_41DF_43A611899DA6_AlbumPlayList"
},
{
 "class": "Photo",
 "duration": 5000,
 "id": "album_809676CC_9425_DA9A_41B5_DD15E74A778F_0",
 "thumbnailUrl": "media/album_809676CC_9425_DA9A_41B5_DD15E74A778F_0_t.png",
 "width": 1920,
 "label": "Bird View",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_809676CC_9425_DA9A_41B5_DD15E74A778F_0.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1080
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -153.67,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1E80CED9_3EC6_1B9A_41C4_196E39E2737E"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": -98.48,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1ECBEF70_3EC6_1AAA_41B1_5A28D12BB558"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -106.92,
   "backwardYaw": 73.94,
   "distance": 1,
   "panorama": "this.panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -12.21,
   "backwardYaw": 26.33,
   "distance": 1,
   "panorama": "this.panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556"
  }
 ],
 "hfov": 360,
 "label": "3rd Floor Stairs",
 "id": "panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8",
 "thumbnailUrl": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_AF1510EC_B78A_5CAC_41C7_094767EC9ABC",
  "this.overlay_AF77A096_B78E_5B7C_41E4_B517F2F0241E"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": -91.35,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1F046FFB_3EC6_199F_41A8_2F01D76508FB"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": -90.6,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_22F2B240_3EC6_2AEA_41A3_80CE81AB1E4C"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -10.59,
   "backwardYaw": -179.66,
   "distance": 1,
   "panorama": "this.panorama_92B5EB5A_992D_0A04_4196_9331249D9F48"
  }
 ],
 "hfov": 360,
 "label": "Basement 2",
 "id": "panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13",
 "thumbnailUrl": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_8BD6C9CD_9931_8C63_41D7_571F8A1D2B38"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 91.45,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_22FD8233_3EC6_2AAE_4182_B6B379562D8C"
},
{
 "class": "Photo",
 "duration": 0,
 "id": "album_A9E00199_B7F5_BD74_41DF_43A611899DA6_11",
 "thumbnailUrl": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_11_t.png",
 "width": 3308,
 "label": "EBROSUR_-12",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_11.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 2339
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 11.38,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1F8730AB_3EC6_27BE_41BC_BF9834475CCB"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -76.39,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1F41404E_3EC6_26F6_41CE_A16B7F88C7B8"
},
{
 "class": "Photo",
 "duration": 0,
 "id": "album_A9E00199_B7F5_BD74_41DF_43A611899DA6_5",
 "thumbnailUrl": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_5_t.png",
 "width": 3308,
 "label": "EBROSUR_-06",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_5.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 2339
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 178.46,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1EC28F81_3EC6_1A6A_41C2_B62212212FDC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 140,
  "class": "PanoramaCameraPosition",
  "yaw": -104.05,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_1F92A0B7_3EC6_2796_41CA_FE421DB6DB59"
},
{
 "class": "Photo",
 "duration": 0,
 "id": "album_A9E00199_B7F5_BD74_41DF_43A611899DA6_8",
 "thumbnailUrl": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_8_t.png",
 "width": 3308,
 "label": "EBROSUR_-09",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_A9E00199_B7F5_BD74_41DF_43A611899DA6_8.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 2339
},
{
 "progressBarBorderColor": "#0066FF",
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "toolTipFontSize": 13,
 "toolTipOpacity": 0.5,
 "toolTipShadowBlurRadius": 3,
 "minHeight": 50,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 7,
 "minWidth": 100,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "height": "100%",
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "class": "ViewerArea",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 0,
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "shadow": false,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Georgia",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "paddingRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 7,
 "toolTipPaddingLeft": 10,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 10,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "id": "Container_7F59BED9_7065_6DCD_41D6_B4AD3EEA9174",
 "left": "0%",
 "width": 300,
 "scrollBarColor": "#000000",
 "children": [
  "this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D",
  "this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "horizontalAlign": "left",
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "minHeight": 1,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "class": "Container",
 "layout": "absolute",
 "data": {
  "name": "--- LEFT PANEL"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_ABAE1D7A_B78F_E5B7_41D1_22EB260F257A"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "horizontalAlign": "left",
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false); this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, true, 0, null, null, false); this.setComponentVisibility(this.MapViewer, true, 0, null, null, false)",
 "scrollBarMargin": 2,
 "gap": 10,
 "creationPolicy": "inAdvance",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "class": "Container",
 "data": {
  "name": "--INFO photo"
 },
 "overflow": "scroll",
 "shadow": false,
 "layout": "absolute"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "horizontalAlign": "left",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false); this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, true, 0, null, null, false); this.setComponentVisibility(this.MapViewer, true, 0, null, null, false)",
 "scrollBarMargin": 2,
 "gap": 10,
 "creationPolicy": "inAdvance",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "class": "Container",
 "data": {
  "name": "--PANORAMA LIST"
 },
 "overflow": "scroll",
 "shadow": false,
 "layout": "absolute"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "horizontalAlign": "left",
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false); this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, true, 0, null, null, false)",
 "scrollBarMargin": 2,
 "gap": 10,
 "creationPolicy": "inAdvance",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "class": "Container",
 "data": {
  "name": "--LOCATION"
 },
 "overflow": "scroll",
 "shadow": false,
 "layout": "absolute"
},
{
 "progressBarBorderColor": "#0066FF",
 "data": {
  "name": "Floor Plan"
 },
 "maxWidth": 1000,
 "id": "MapViewer",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#FFFFFF",
 "toolTipBorderColor": "#767676",
 "right": "0%",
 "width": "31.767%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "minHeight": 1,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "minWidth": 1,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "height": "39.581%",
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "class": "ViewerArea",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "shadow": false,
 "playbackBarHeadShadowHorizontalLength": 0,
 "show": "this.setMediaBehaviour(this.playList_1E76CE6D_3EC6_1ABB_41CB_C2554169875A, 0)",
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "maxHeight": 1000,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "paddingRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "bottom": "0%",
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "progressBackgroundColorRatios": [
  0.01
 ]
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_25CADDB2_3EC6_79AE_41A8_6E606C53F177",
 "width": 115.05,
 "scrollBarColor": "#000000",
 "right": "0%",
 "children": [
  "this.Container_25CBADB2_3EC6_79AE_41C6_443398E5843E",
  "this.Container_25CB4DB2_3EC6_79AE_41C5_F53BFB78DB4D"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "minHeight": 1,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 641,
 "scrollBarMargin": 2,
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "class": "Container",
 "layout": "absolute",
 "data": {
  "name": "--SETTINGS"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_25CB2DB2_3EC6_79AE_41C4_1B25AAA398C0",
 "width": 58,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_25CB2DB2_3EC6_79AE_41C4_1B25AAA398C0.png",
 "pressedRollOverIconURL": "skin/IconButton_25CB2DB2_3EC6_79AE_41C4_1B25AAA398C0_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_25CB2DB2_3EC6_79AE_41C4_1B25AAA398C0_pressed.png",
 "class": "IconButton",
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_25CB0DB2_3EC6_79AE_41CE_430D2B90E534",
 "width": 58,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_25CB0DB2_3EC6_79AE_41CE_430D2B90E534.png",
 "pressedRollOverIconURL": "skin/IconButton_25CB0DB2_3EC6_79AE_41CE_430D2B90E534_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_25CB0DB2_3EC6_79AE_41CE_430D2B90E534_pressed.png",
 "class": "IconButton",
 "data": {
  "name": "IconButton MUTE"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_25CB5DB2_3EC6_79AE_419C_838D5EB0FC21",
 "width": 58,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_25CB5DB2_3EC6_79AE_419C_838D5EB0FC21.png",
 "minWidth": 1,
 "mode": "push",
 "height": 58,
 "rollOverIconURL": "skin/IconButton_25CB5DB2_3EC6_79AE_419C_838D5EB0FC21_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "class": "IconButton",
 "data": {
  "name": "IconButton VR"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_25CB1DB2_3EC6_79AE_4182_D3422EDDDC4E",
 "width": 58,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_25CB1DB2_3EC6_79AE_4182_D3422EDDDC4E.png",
 "pressedRollOverIconURL": "skin/IconButton_25CB1DB2_3EC6_79AE_4182_D3422EDDDC4E_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_25CB1DB2_3EC6_79AE_4182_D3422EDDDC4E_pressed.png",
 "class": "IconButton",
 "data": {
  "name": "IconButton HS "
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_25CB7DB2_3EC6_79AE_41B7_6497A903B317",
 "width": 58,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_25CB7DB2_3EC6_79AE_41B7_6497A903B317.png",
 "pressedRollOverIconURL": "skin/IconButton_25CB7DB2_3EC6_79AE_41B7_6497A903B317_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_25CB7DB2_3EC6_79AE_41B7_6497A903B317_pressed.png",
 "class": "IconButton",
 "data": {
  "name": "IconButton GYRO"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_1E585E82_3EC6_1A69_4153_147AE11EDABA, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "media": "this.panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_1E585E82_3EC6_1A69_4153_147AE11EDABA"
},
{
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_1E5B9E83_3EC6_1A6F_41C6_2843FE447D07, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "media": "this.panorama_BA44459A_B775_E574_41C9_23F7475E5DA0",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_1E5B9E83_3EC6_1A6F_41C6_2843FE447D07"
},
{
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_1E5B3E88_3EC6_1A79_41CB_14E6A3D65E80, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "media": "this.panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_1E5B3E88_3EC6_1A79_41CB_14E6A3D65E80"
},
{
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_1E5ABE89_3EC6_1A7B_41B2_AACF91177FE8, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4)",
 "media": "this.panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_1E5ABE89_3EC6_1A7B_41B2_AACF91177FE8"
},
{
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_1E5A2E89_3EC6_1A7B_41CC_93DF34C21F37, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 4, 5)",
 "media": "this.panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_1E5A2E89_3EC6_1A7B_41CC_93DF34C21F37"
},
{
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_1E5D4E89_3EC6_1A7B_41B6_3829F36DFBA0, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 6)",
 "media": "this.panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_1E5D4E89_3EC6_1A7B_41B6_3829F36DFBA0"
},
{
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_1E5CEE8A_3EC6_1A79_41CE_36DF2625394E, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 6, 7)",
 "media": "this.panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_1E5CEE8A_3EC6_1A79_41CE_36DF2625394E"
},
{
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_1E5ECE8A_3EC6_1A79_41B9_BC9C0A1EC8EF, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 10, 11)",
 "media": "this.panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_1E5ECE8A_3EC6_1A79_41B9_BC9C0A1EC8EF"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A, this.camera_1F3D5FE2_3EC6_19A9_41CE_0792BE3903D7); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 32.05,
   "pitch": -30.33,
   "yaw": -94.11,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AF8D6ADA_B796_ACF4_41BB_69F1332061E8",
   "distance": 100
  }
 ],
 "id": "overlay_A4C1C07F_B78B_FBAD_41C6_5EE57117D445",
 "maps": [
  {
   "hfov": 32.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -94.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -30.33
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 30.16,
   "pitch": -37.24,
   "yaw": -150.76,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A15EE878_B79A_EBB4_41D6_6371DBA60072",
   "distance": 50
  }
 ],
 "id": "overlay_A4089FBE_B796_A4AC_41B7_D2496C7403C9",
 "maps": [
  {
   "hfov": 30.16,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -150.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -37.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4, this.camera_1F093FEE_3EC6_19B9_41CE_98C07FBCFFFE); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.81,
   "pitch": -4.01,
   "yaw": 171.33,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A0365391_B79A_5D75_41C2_71CBF751B0A0",
   "distance": 50
  }
 ],
 "id": "overlay_A3EFFF56_B79E_65FC_41A0_99BF01026E4D",
 "maps": [
  {
   "hfov": 25.81,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 171.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -4.01
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4, this.camera_1F41404E_3EC6_26F6_41CE_A16B7F88C7B8); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01a Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23.69,
   "pitch": -34.04,
   "yaw": -137.57,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_ABD7547E_B7B5_DBAC_41C5_F0F63359CC9F",
   "distance": 50
  }
 ],
 "id": "overlay_AFF689BA_B7BA_ECB4_41DE_431EADC01119",
 "maps": [
  {
   "hfov": 23.69,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -137.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -34.04
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5, this.camera_1FBEA080_3EC6_266A_41A3_39BC29E307CE); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 39.91,
   "pitch": -20.68,
   "yaw": -176.64,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A387CEB0_B775_A4B3_418E_C7A8FC22AFFD",
   "distance": 100
  }
 ],
 "id": "overlay_BA2F9D25_B77A_A55D_419A_E48A7AC7BDDA",
 "maps": [
  {
   "hfov": 39.91,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -176.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -20.68
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 40.87,
   "pitch": -16.66,
   "yaw": -2.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A3871EB0_B775_A4B3_41D2_0670B822108C",
   "distance": 100
  }
 ],
 "id": "overlay_BA2FED25_B77A_A55D_41C8_4ACBFFE31C59",
 "maps": [
  {
   "hfov": 40.87,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -16.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5, this.camera_1FA33073_3EC6_26AE_41CE_BABD88801972); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 40.09,
   "pitch": -36.23,
   "yaw": 44.82,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A3843EB0_B775_A4B3_41DC_E8D9AA0BD418",
   "distance": 50
  }
 ],
 "id": "overlay_B88882E2_B77E_7CD4_41E2_924C08FBDE05",
 "maps": [
  {
   "hfov": 40.09,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 44.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -36.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B, this.camera_1F5A905B_3EC6_269E_41B7_88D11119E10A); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01a Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23.04,
   "pitch": -36.3,
   "yaw": 103.61,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AF3085FA_B7BA_A4B7_41D9_8C1843D4F85C",
   "distance": 50
  }
 ],
 "id": "overlay_A006E84D_B7B6_6BEC_41AE_3C1A36E6929E",
 "maps": [
  {
   "hfov": 23.04,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 103.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -36.3
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556, this.camera_1F562067_3EC6_26B6_41B1_8F8E07BBE6D8); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01a Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23.27,
   "pitch": -35.54,
   "yaw": 74.97,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AF3125FA_B7BA_A4B7_41D6_545957F88466",
   "distance": 50
  }
 ],
 "id": "overlay_AF96FB3F_B7BA_ADAC_41C5_282AEF172743",
 "maps": [
  {
   "hfov": 23.27,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 74.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -35.54
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214, this.camera_1F662020_3EC6_26A9_41C0_104864A4968E); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.63,
   "pitch": -30.52,
   "yaw": -91.09,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A883F373_B78A_5DB4_41E3_001FA08FD589",
   "distance": 100
  }
 ],
 "id": "overlay_AED1A215_B78A_BF7C_41E3_14DF19B45E47",
 "maps": [
  {
   "hfov": 24.63,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -91.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -30.52
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5, this.camera_1F6CE014_3EC6_2669_41A7_4659F23D8D3F); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.76,
   "pitch": -30.02,
   "yaw": -113.45,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A8824373_B78A_5DB4_41E6_59E3D1EB601E",
   "distance": 100
  }
 ],
 "id": "overlay_AE1FFFC4_B78A_A4D3_41E0_3BE900C570DE",
 "maps": [
  {
   "hfov": 24.76,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -113.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -30.02
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8, this.camera_1F75A042_3EC6_26EE_41AE_3202602939FE); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 27.03,
   "pitch": -1.45,
   "yaw": 73.94,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9F0B2B90_B88A_ED73_41CB_103461CDC903",
   "distance": 50
  }
 ],
 "id": "overlay_98BE1C6D_B88D_ABAC_41D8_3D950D154478",
 "maps": [
  {
   "hfov": 27.03,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 73.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.45
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22, this.camera_1E92BF0E_3EC6_1A76_41AE_C06C19C08443); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.34,
   "pitch": -2.25,
   "yaw": 158.52,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9A0F4D02_B88E_A554_41DA_2EBBD1D02282",
   "distance": 50
  }
 ],
 "id": "overlay_98072FEC_B88D_A4D3_41D7_F4EA1E2FB393",
 "maps": [
  {
   "hfov": 22.34,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 158.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60, this.camera_1EE40F37_3EC6_1A96_41B8_8B7E3C06C754); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 40.21,
   "pitch": -19.53,
   "yaw": -1.14,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A38B1EAE_B775_A4AF_41C7_FFADEC491FF2",
   "distance": 100
  }
 ],
 "id": "overlay_BA44759A_B775_E574_41D4_FB74D2003AC5",
 "maps": [
  {
   "hfov": 40.21,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -19.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558, this.camera_1EECBF20_3EC6_1AAA_41A8_D487CF4DD459); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 40.15,
   "pitch": -19.76,
   "yaw": -178.52,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A38ABEAE_B775_A4AF_41C6_C3F710435EBA",
   "distance": 100
  }
 ],
 "id": "overlay_BA44059A_B775_E574_41CE_E29B4D10B3B7",
 "maps": [
  {
   "hfov": 40.15,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -178.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -19.76
  }
 ]
},
{
 "map": {
  "width": 21.59,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_8777A049_99D1_7C60_41D5_A407F70F7A62_HS_7_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 446.61,
  "x": 172.45,
  "offsetY": 0,
  "height": 21.59,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "class": "HotspotMapOverlayImage",
  "height": 21.59,
  "y": 445.9,
  "width": 21.59,
  "x": 171.65,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_8777A049_99D1_7C60_41D5_A407F70F7A62_HS_7.png",
     "class": "ImageResourceLevel",
     "width": 21,
     "height": 21
    }
   ]
  }
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "id": "overlay_96A47E0A_9996_FED5_41E1_FD36A9EAED0E",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 21.59,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_8777A049_99D1_7C60_41D5_A407F70F7A62_HS_8_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 399.05,
  "x": 378.53,
  "offsetY": 0,
  "height": 21.59,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "class": "HotspotMapOverlayImage",
  "height": 21.59,
  "y": 398.37,
  "width": 21.59,
  "x": 377.67,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_8777A049_99D1_7C60_41D5_A407F70F7A62_HS_8.png",
     "class": "ImageResourceLevel",
     "width": 21,
     "height": 21
    }
   ]
  }
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "id": "overlay_96C4676B_9991_AD2B_41E1_3A983D483977",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 21.59,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_8777A049_99D1_7C60_41D5_A407F70F7A62_HS_9_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 297.89,
  "x": 806.49,
  "offsetY": 0,
  "height": 21.59,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "class": "HotspotMapOverlayImage",
  "height": 21.59,
  "y": 297.14,
  "width": 21.59,
  "x": 805.76,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_8777A049_99D1_7C60_41D5_A407F70F7A62_HS_9.png",
     "class": "ImageResourceLevel",
     "width": 21,
     "height": 21
    }
   ]
  }
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "id": "overlay_8913E19A_9991_A5F5_41D7_EDA39D2721BC",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 21.59,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_8777A049_99D1_7C60_41D5_A407F70F7A62_HS_10_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 249.35,
  "x": 1004.46,
  "offsetY": 0,
  "height": 21.59,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "class": "HotspotMapOverlayImage",
  "height": 21.59,
  "y": 248.54,
  "width": 21.59,
  "x": 1003.69,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_8777A049_99D1_7C60_41D5_A407F70F7A62_HS_10.png",
     "class": "ImageResourceLevel",
     "width": 21,
     "height": 21
    }
   ]
  }
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "id": "overlay_897C46C3_999F_AF5B_41B3_B4C9BA1B553B",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 21.59,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_8777A049_99D1_7C60_41D5_A407F70F7A62_HS_11_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 615.75,
  "x": 881.97,
  "offsetY": 0,
  "height": 21.59,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "class": "HotspotMapOverlayImage",
  "height": 21.59,
  "y": 614.92,
  "width": 21.59,
  "x": 881.27,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_8777A049_99D1_7C60_41D5_A407F70F7A62_HS_11.png",
     "class": "ImageResourceLevel",
     "width": 21,
     "height": 21
    }
   ]
  }
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "id": "overlay_962AC8F8_999E_A335_41C1_5877B03B6346",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 21.59,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_8777A049_99D1_7C60_41D5_A407F70F7A62_HS_12_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 734.41,
  "x": 387.37,
  "offsetY": 0,
  "height": 21.59,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "class": "HotspotMapOverlayImage",
  "height": 21.59,
  "y": 733.7,
  "width": 21.59,
  "x": 386.76,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_8777A049_99D1_7C60_41D5_A407F70F7A62_HS_12.png",
     "class": "ImageResourceLevel",
     "width": 21,
     "height": 21
    }
   ]
  }
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "id": "overlay_896518D5_9992_637F_41DB_E54BD934C20B",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 21.59,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_8777A049_99D1_7C60_41D5_A407F70F7A62_HS_13_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 799.62,
  "x": 172.36,
  "offsetY": 0,
  "height": 21.59,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "class": "HotspotMapOverlayImage",
  "height": 21.59,
  "y": 798.86,
  "width": 21.59,
  "x": 171.65,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_8777A049_99D1_7C60_41D5_A407F70F7A62_HS_13.png",
     "class": "ImageResourceLevel",
     "width": 21,
     "height": 21
    }
   ]
  }
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "id": "overlay_88F34F9D_9991_BDEF_41C3_F50909816221",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 21.59,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_8777A049_99D1_7C60_41D5_A407F70F7A62_HS_14_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 593.08,
  "x": 652.42,
  "offsetY": 0,
  "height": 21.59,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "class": "HotspotMapOverlayImage",
  "height": 21.59,
  "y": 592.97,
  "width": 21.59,
  "x": 652.24,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_8777A049_99D1_7C60_41D5_A407F70F7A62_HS_14.png",
     "class": "ImageResourceLevel",
     "width": 21,
     "height": 21
    }
   ]
  }
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "id": "overlay_8BB91ED3_99B1_9F7B_41B3_7AF57E433679",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4, this.camera_1F8BC08C_3EC6_267A_4191_DA684E75E703); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.74,
   "pitch": -3.34,
   "yaw": 93.16,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A3F553A9_B78F_DD54_41D7_F1CF8DF2F61C",
   "distance": 100
  }
 ],
 "id": "overlay_A66920A7_B78A_DB5C_41E0_5A747FC14E65",
 "maps": [
  {
   "hfov": 26.74,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 93.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.34
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA09F476_B77A_FBBC_41B4_317C6928F125, this.camera_1F92A0B7_3EC6_2796_41CA_FE421DB6DB59); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01a Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 32.22,
   "pitch": -29.14,
   "yaw": 94.44,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A3FAC3A9_B78F_DD54_41C8_B590D5B2E197",
   "distance": 50
  }
 ],
 "id": "overlay_A5ADCC84_B78D_AB53_41E0_B6C26B71A8BD",
 "maps": [
  {
   "hfov": 32.22,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 94.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -29.14
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5, this.camera_1F8730AB_3EC6_27BE_41BC_BF9834475CCB); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 32.94,
   "pitch": -43.52,
   "yaw": -3.54,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A3FAB3A9_B78F_DD54_41C4_0690E314E68E",
   "distance": 100
  }
 ],
 "id": "overlay_A51B4F0E_B78E_A56F_4191_F28EEB1E4C65",
 "maps": [
  {
   "hfov": 32.94,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -3.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -43.52
  }
 ]
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_ABAE6D7A_B78F_E5B7_41D3_93A520575A96",
 "left": 10,
 "iconURL": "skin/IconButton_ABAE6D7A_B78F_E5B7_41D3_93A520575A96.png",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "top": "20%",
 "width": "14.22%",
 "bottom": "20%",
 "minWidth": 50,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_ABAE6D7A_B78F_E5B7_41D3_93A520575A96_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_ABAE6D7A_B78F_E5B7_41D3_93A520575A96_pressed.png",
 "class": "IconButton",
 "data": {
  "name": "IconButton <"
 },
 "cursor": "hand"
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_ABAE7D7A_B78F_E5B7_41E0_6B4DB6A26A06",
 "right": 10,
 "iconURL": "skin/IconButton_ABAE7D7A_B78F_E5B7_41E0_6B4DB6A26A06.png",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "top": "20%",
 "width": "14.22%",
 "bottom": "20%",
 "minWidth": 50,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_ABAE7D7A_B78F_E5B7_41E0_6B4DB6A26A06_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_ABAE7D7A_B78F_E5B7_41E0_6B4DB6A26A06_pressed.png",
 "class": "IconButton",
 "data": {
  "name": "IconButton >"
 },
 "cursor": "hand"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_95857EB1_992D_0A04_41B1_25074D224AFF, this.camera_1EDFCF98_3EC6_199A_41B2_56E84137D8C9); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 32.67,
   "pitch": -40.03,
   "yaw": 1.72,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A384CEAF_B775_A4AD_41E5_9AF35AC45295",
   "distance": 100
  }
 ],
 "id": "overlay_BA2DE7C4_B77A_64DC_41D7_4DA02028272D",
 "maps": [
  {
   "hfov": 32.67,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -40.03
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5, this.camera_1F203FD2_3EC6_19E9_41AE_A727B630FE23); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 37.41,
   "pitch": -28.72,
   "yaw": 89.4,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A3841EAF_B775_A4AD_41DD_C6D951DFD222",
   "distance": 100
  }
 ],
 "id": "overlay_BA2E07C4_B77A_64DC_41D4_750320C26F4C",
 "maps": [
  {
   "hfov": 37.41,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 89.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -28.72
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC, this.camera_1ED6FFAA_3EC6_19BE_419B_E1508FD1C45D); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 37.32,
   "pitch": -28.97,
   "yaw": -90.73,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A387AEAF_B775_A4AD_41C7_4FB3FED529F7",
   "distance": 100
  }
 ],
 "id": "overlay_BA2E37C4_B77A_64DC_41C8_8AA03065FE3E",
 "maps": [
  {
   "hfov": 37.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -28.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558, this.camera_22FD8233_3EC6_2AAE_4182_B6B379562D8C); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 39.04,
   "pitch": -23.77,
   "yaw": 81.52,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A385FEAF_B775_A4AD_41C0_1D198DA068AF",
   "distance": 100
  }
 ],
 "id": "overlay_BA3F11DE_B77A_5CEC_41DB_3031440B850F",
 "maps": [
  {
   "hfov": 39.04,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 81.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -23.77
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA, this.camera_22F2B240_3EC6_2AEA_41A3_80CE81AB1E4C); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 39.89,
   "pitch": -20.76,
   "yaw": 0.13,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A3850EAF_B775_A4AD_41BC_AAEE34A48C77",
   "distance": 100
  }
 ],
 "id": "overlay_BA3F41DE_B77A_5CEC_41E2_C27FDB8EF893",
 "maps": [
  {
   "hfov": 39.89,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -20.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E, this.camera_22C8425A_3EC6_2A9E_41C8_FFCFA1B4193F); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 39.94,
   "pitch": -20.6,
   "yaw": 47.46,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A384AEAF_B775_A4AD_41E6_8D993BE690E1",
   "distance": 50
  }
 ],
 "id": "overlay_BA3F51DE_B77A_5CEC_41E2_93D15DCD6563",
 "maps": [
  {
   "hfov": 39.94,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 47.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -20.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4, this.camera_228971A4_3EC6_29A9_4182_1715D93F1A32); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 36.99,
   "pitch": -35.48,
   "yaw": -87.2,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A1799420_B78A_BB53_41E3_63EC05D37B97",
   "distance": 100
  }
 ],
 "id": "overlay_A1DBFDC1_B78B_A4D4_418F_7C44507C57E6",
 "maps": [
  {
   "hfov": 36.99,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -87.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -35.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8, this.camera_228C01AF_3EC6_29B6_41C5_8B42E1A8AD21); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01 Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.43,
   "pitch": -10.62,
   "yaw": 26.33,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_ADDC03C7_B78D_BCDD_41C1_BD10FA7F615C",
   "distance": 50
  }
 ],
 "id": "overlay_A1CDF69A_B78D_A777_41E2_084F400AC3CF",
 "maps": [
  {
   "hfov": 18.43,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 26.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -10.62
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4, this.camera_22B53197_3EC6_2997_41B0_572B90BFA65E); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 35.69,
   "pitch": -33.22,
   "yaw": -1.91,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD4BDE02_B7B6_6757_41E5_BF16FB82C85D",
   "distance": 100
  }
 ],
 "id": "overlay_A2487C28_B78A_6B54_41D8_3865F1CD5AE1",
 "maps": [
  {
   "hfov": 35.69,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -33.22
  }
 ]
},
{
 "class": "PhotoPlayList",
 "items": [
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_809676CC_9425_DA9A_41B5_DD15E74A778F_0"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_809676CC_9425_DA9A_41B5_DD15E74A778F_1"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_809676CC_9425_DA9A_41B5_DD15E74A778F_2"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_809676CC_9425_DA9A_41B5_DD15E74A778F_3"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_809676CC_9425_DA9A_41B5_DD15E74A778F_4"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_809676CC_9425_DA9A_41B5_DD15E74A778F_5"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_809676CC_9425_DA9A_41B5_DD15E74A778F_6"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_809676CC_9425_DA9A_41B5_DD15E74A778F_7"
  }
 ],
 "id": "album_809676CC_9425_DA9A_41B5_DD15E74A778F_AlbumPlayList"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A, this.camera_229D61D4_3EC6_29EA_41B9_F7CF39138BC5); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.38,
   "pitch": -6.35,
   "yaw": 75.95,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AF8BCADC_B796_ACEC_41E0_B5D369D0B6DF",
   "distance": 50
  }
 ],
 "id": "overlay_A49C0EBF_B78A_A4AC_41D0_D7BFA97E00DB",
 "maps": [
  {
   "hfov": 25.38,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 75.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -6.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E, this.camera_1FFB30D0_3EC6_27EA_41BE_E2A27F331A62); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.06,
   "pitch": -13.39,
   "yaw": -84.96,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A2CAC71E_B78B_E56C_41BD_407D1B819830",
   "distance": 100
  }
 ],
 "id": "overlay_A64E3FAF_B775_A4AC_41E0_66FBF99B9F53",
 "maps": [
  {
   "hfov": 26.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -84.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -13.39
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A, this.camera_1FEFD0C4_3EC6_27EA_4183_B3C9AD5EDB02); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.19,
   "pitch": -12.13,
   "yaw": -168.62,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A2CA871E_B78B_E56C_41E0_03D9390BE62B",
   "distance": 100
  }
 ],
 "id": "overlay_A619580A_B78A_AB54_419A_E36F24FFB927",
 "maps": [
  {
   "hfov": 26.19,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -168.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -12.13
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556, this.camera_22E6B227_3EC6_2AB6_4161_E72A00EC92D6); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01 Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23.15,
   "pitch": -5.98,
   "yaw": 23.57,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AE02BA30_B796_6FB3_41BE_FFEA1D794615",
   "distance": 50
  }
 ],
 "id": "overlay_A19B32F7_B79B_DCBD_41C5_BADAB1DAF30A",
 "maps": [
  {
   "hfov": 23.15,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 23.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -5.98
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4, this.camera_22E1421B_3EC6_2A9E_4191_B84FB70AD6BD); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 41.57,
   "pitch": -40.25,
   "yaw": -111.56,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9D25E57F_B895_A5AC_41B0_A1B32D252A0C",
   "distance": 100
  }
 ],
 "id": "overlay_9930C3BF_B897_BCAC_41C0_C671D7ADE6BC",
 "maps": [
  {
   "hfov": 41.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -111.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -40.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC, this.camera_22BAB168_3EC6_26B9_41C6_B6D193AB27C7); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 36.74,
   "pitch": -30.55,
   "yaw": -84.53,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A3885EAD_B775_A4AD_41E2_08ED64B7C8C1",
   "distance": 100
  }
 ],
 "id": "overlay_BA3351C8_B775_BCD3_41D3_1B55236FAFBA",
 "maps": [
  {
   "hfov": 36.74,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -84.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -30.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA44459A_B775_E574_41C9_23F7475E5DA0, this.camera_1FF430DD_3EC6_279A_41BB_D27BD8CFC9CB); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 38.08,
   "pitch": -26.79,
   "yaw": -178.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A38BDEAD_B775_A4AD_41D3_7B5CB5E45E72",
   "distance": 100
  }
 ],
 "id": "overlay_BA32B1C9_B775_BCD5_41D9_01A7BFFFB631",
 "maps": [
  {
   "hfov": 38.08,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -178.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -26.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22, this.camera_229161F5_3EC6_29AA_41C5_B386FEECDC62); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01a Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.79,
   "pitch": -32.78,
   "yaw": 50.47,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9C855D72_B88B_A5B4_41DF_3330014E8F12",
   "distance": 50
  }
 ],
 "id": "overlay_A8120C1D_B775_AB6D_41C3_43B647EFD0BB",
 "maps": [
  {
   "hfov": 26.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 50.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -32.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5, this.camera_1ECBEF70_3EC6_1AAA_41B1_5A28D12BB558); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 40.15,
   "pitch": -19.76,
   "yaw": -88.55,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_820C675C_943F_FBBA_41CF_32A3BCBEA56A",
   "distance": 100
  }
 ],
 "id": "overlay_84F9FD2B_9426_4F9F_41DD_CD562ED0DB72",
 "maps": [
  {
   "hfov": 40.15,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -88.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -19.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA44459A_B775_E574_41C9_23F7475E5DA0, this.camera_1EFE1F4C_3EC6_1AFA_41C4_33B0A94AA125); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 40.21,
   "pitch": -19.53,
   "yaw": -1.14,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_820C375C_943F_FBBA_41C7_E376378015AE",
   "distance": 100
  }
 ],
 "id": "overlay_855CB242_9426_5589_41B7_ADB20A3A4A45",
 "maps": [
  {
   "hfov": 40.21,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -19.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741, this.camera_1EC28F81_3EC6_1A6A_41C2_B62212212FDC); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 39.47,
   "pitch": -22.32,
   "yaw": -178.2,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_820DF75D_943F_FBBA_41C7_4DE82B7EFE23",
   "distance": 100
  }
 ],
 "id": "overlay_867E23A7_9426_7A96_41B8_6BA47D07DF2D",
 "maps": [
  {
   "hfov": 39.47,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -178.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -22.32
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA, this.camera_2297B201_3EC6_2A6A_41CF_0961D5334CD4); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 34.5,
   "pitch": -14.02,
   "yaw": 179.81,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A3868EB1_B775_A4B5_41DC_CD47492F91D0",
   "distance": 100
  }
 ],
 "id": "overlay_BA9C2B56_B776_6DFF_41E6_3788094930B7",
 "maps": [
  {
   "hfov": 34.5,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 179.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -14.02
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60, this.camera_22EB420E_3EC6_2A76_41C9_20CBA2926FE2); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 39.48,
   "pitch": -22.26,
   "yaw": 157.1,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A386CEB1_B775_A4B5_41A3_102C06E2A4B0",
   "distance": 50
  }
 ],
 "id": "overlay_BA9C7B56_B776_6DFF_41D0_77BDDBF5DA2E",
 "maps": [
  {
   "hfov": 39.48,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 157.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -22.26
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_95857EB1_992D_0A04_41B1_25074D224AFF, this.camera_1F046FFB_3EC6_199F_41A8_2F01D76508FB); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 40.76,
   "pitch": -17.16,
   "yaw": -2.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8E12147D_9930_8423_41DE_0CBCCCC67073",
   "distance": 100
  }
 ],
 "id": "overlay_88D9F441_9930_8460_41E0_07C105618EF6",
 "maps": [
  {
   "hfov": 40.76,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -17.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13, this.camera_1F116008_3EC6_2679_41BC_5F13FD276651); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 41.37,
   "pitch": -14.15,
   "yaw": -179.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8E0DB47D_9930_8423_41D0_DACD3A2B35E2",
   "distance": 100
  }
 ],
 "id": "overlay_8D35E7C4_9937_8461_41E1_A5EF2BFAC575",
 "maps": [
  {
   "hfov": 41.37,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -179.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -14.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558, this.camera_22BE518B_3EC6_267F_41AB_5F66B9EB64CE); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 38.91,
   "pitch": -24.2,
   "yaw": -1.54,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A385AEAE_B775_A4AF_41E2_59B3D6BB2E3F",
   "distance": 100
  }
 ],
 "id": "overlay_BA2809CB_B775_ACD4_41E6_A6864DFC77A0",
 "maps": [
  {
   "hfov": 38.91,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -24.2
  }
 ]
},
{
 "progressBarBorderColor": "#0066FF",
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_ABAE4D7A_B78F_E5B7_41DC_DEBF72A7639C",
 "left": "0%",
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "toolTipFontSize": 12,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "minHeight": 1,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "minWidth": 1,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "height": "100%",
 "progressBarBorderSize": 6,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "class": "ViewerArea",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "shadow": false,
 "playbackBarHeadShadowHorizontalLength": 0,
 "show": "this.ViewerAreaLabeled_ABAE4D7A_B78F_E5B7_41DC_DEBF72A7639C.bind('hide', function(e){ e.source.unbind('hide', arguments.callee, this); this.playList_1E7E8E6C_3EC6_1AB9_41A4_9581A274292B.set('selectedIndex', -1); }, this); this.playList_1E7E8E6C_3EC6_1AB9_41A4_9581A274292B.set('selectedIndex', 0)",
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "paddingRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 6,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": "0%",
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "progressBackgroundColorRatios": [
  0.01
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_92B5EB5A_992D_0A04_4196_9331249D9F48, this.camera_2282A1BB_3EC6_299E_41A4_C27250EFC1F8); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 40.53,
   "pitch": -18.17,
   "yaw": 88.65,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8E13047C_9930_8421_41B8_FD94137AAECF",
   "distance": 100
  }
 ],
 "id": "overlay_88F81F23_9930_8420_41DB_DCFAA52E2A26",
 "maps": [
  {
   "hfov": 40.53,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 88.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -18.17
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA, this.camera_2286F1C7_3EC6_29F6_4190_E55CC6AC8C0D); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 34.62,
   "pitch": -35.76,
   "yaw": -178.4,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8E12D47C_9930_8421_41DC_253004F1ABE6",
   "distance": 100
  }
 ],
 "id": "overlay_8A1B398D_9931_8CE3_41CE_682ADDF8D90B",
 "maps": [
  {
   "hfov": 34.62,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -178.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -35.76
  }
 ]
},
{
 "class": "PhotoPlayList",
 "items": [
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_A9E00199_B7F5_BD74_41DF_43A611899DA6_0"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_A9E00199_B7F5_BD74_41DF_43A611899DA6_1"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_A9E00199_B7F5_BD74_41DF_43A611899DA6_2"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_A9E00199_B7F5_BD74_41DF_43A611899DA6_3"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_A9E00199_B7F5_BD74_41DF_43A611899DA6_4"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_A9E00199_B7F5_BD74_41DF_43A611899DA6_5"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_A9E00199_B7F5_BD74_41DF_43A611899DA6_6"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_A9E00199_B7F5_BD74_41DF_43A611899DA6_7"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_A9E00199_B7F5_BD74_41DF_43A611899DA6_8"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_A9E00199_B7F5_BD74_41DF_43A611899DA6_9"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_A9E00199_B7F5_BD74_41DF_43A611899DA6_10"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_A9E00199_B7F5_BD74_41DF_43A611899DA6_11"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_A9E00199_B7F5_BD74_41DF_43A611899DA6_12"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_A9E00199_B7F5_BD74_41DF_43A611899DA6_13"
  }
 ],
 "id": "album_A9E00199_B7F5_BD74_41DF_43A611899DA6_AlbumPlayList"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22, this.camera_1E885EC2_3EC6_1BEE_41BA_972EC14878CC); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01a Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.7,
   "pitch": -43.83,
   "yaw": -106.92,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AF195145_B78A_5DDC_41B9_3B0A7EB5C9DB",
   "distance": 50
  }
 ],
 "id": "overlay_AF1510EC_B78A_5CAC_41C7_094767EC9ABC",
 "maps": [
  {
   "hfov": 25.7,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -106.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -43.83
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556, this.camera_1E80CED9_3EC6_1B9A_41C4_196E39E2737E); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01a Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.19,
   "pitch": -47.85,
   "yaw": -12.21,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A882F373_B78A_5DB4_41B7_B0A4B3D9FB9E",
   "distance": 50
  }
 ],
 "id": "overlay_AF77A096_B78E_5B7C_41E4_B517F2F0241E",
 "maps": [
  {
   "hfov": 19.19,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -12.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -47.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_92B5EB5A_992D_0A04_4196_9331249D9F48, this.camera_1E9ADEF8_3EC6_1B9A_41C5_7CA443FDA8EC); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 41.5,
   "pitch": -13.4,
   "yaw": -10.59,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8E12747C_9930_8421_41D9_7F916944FF84",
   "distance": 100
  }
 ],
 "id": "overlay_8BD6C9CD_9931_8C63_41D7_571F8A1D2B38",
 "maps": [
  {
   "hfov": 41.5,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -10.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -13.4
  }
 ]
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D",
 "left": "0%",
 "width": 66,
 "scrollBarColor": "#000000",
 "children": [
  "this.Container_7FF195EF_706F_7FC6_41D7_A104CA87824D",
  "this.IconButton_7FF185EF_706F_7FC6_41A5_21B418265412"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "horizontalAlign": "left",
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "minHeight": 1,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "scrollBarMargin": 2,
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "class": "Container",
 "layout": "absolute",
 "data": {
  "name": "- COLLAPSE"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "id": "Container_7DB20382_7065_343F_4186_6E0B0B3AFF36",
 "propagateClick": true,
 "width": 300,
 "scrollBarColor": "#000000",
 "right": "0%",
 "children": [
  "this.Image_7DB3C373_7065_34DE_41BA_CF5206137DED",
  "this.Container_7DB3F373_7065_34CE_41B4_E77DDA40A4F3",
  "this.Container_7DBCC382_7065_343F_41D5_9D3C36B5F479"
 ],
 "borderSize": 0,
 "paddingRight": 40,
 "paddingLeft": 40,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "scrollBarOpacity": 0.5,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#031C11"
 ],
 "top": "0%",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "height": "100%",
 "gap": 10,
 "paddingTop": 40,
 "paddingBottom": 40,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "class": "Container",
 "layout": "absolute",
 "data": {
  "name": "- EXPANDED"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_ABAE1D7A_B78F_E5B7_41D1_22EB260F257A",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_ABAEAD79_B78F_E5B5_41D7_E1D3FC906795"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "class": "Container",
 "layout": "absolute",
 "data": {
  "name": "--PHOTOALBUM"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "scrollBarColor": "#000000",
 "data": {
  "name": "Global"
 },
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "top": "10%",
 "bottom": "10%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "shadowVerticalLength": 0,
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "shadow": true,
 "class": "Container",
 "overflow": "visible",
 "shadowHorizontalLength": 0,
 "layout": "absolute",
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "15%",
 "scrollBarColor": "#000000",
 "data": {
  "name": "Global"
 },
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "top": "10%",
 "bottom": "10%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "shadowVerticalLength": 0,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "shadow": true,
 "class": "Container",
 "overflow": "scroll",
 "shadowHorizontalLength": 0,
 "layout": "horizontal",
 "propagateClick": false
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_25CBADB2_3EC6_79AE_41C6_443398E5843E",
 "width": 110,
 "scrollBarColor": "#000000",
 "right": "0%",
 "children": [
  "this.IconButton_25CBBDB2_3EC6_79AE_41B1_BA0DBC3B9FA5"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "center",
 "minHeight": 1,
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 110,
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "class": "Container",
 "layout": "horizontal",
 "data": {
  "name": "button menu sup"
 },
 "overflow": "visible",
 "shadow": false
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_25CB4DB2_3EC6_79AE_41C5_F53BFB78DB4D",
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_25CB5DB2_3EC6_79AE_419C_838D5EB0FC21",
  "this.IconButton_25CB7DB2_3EC6_79AE_41B7_6497A903B317",
  "this.IconButton_25CB0DB2_3EC6_79AE_41CE_430D2B90E534",
  "this.IconButton_25CB1DB2_3EC6_79AE_4182_D3422EDDDC4E",
  "this.IconButton_25CB2DB2_3EC6_79AE_41C4_1B25AAA398C0",
  "this.IconButton_25CB3DB2_3EC6_79AE_41CC_FB28DBABC081",
  "this.IconButton_25CACDB2_3EC6_79AE_41CD_E1A72433CDA0"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "horizontalAlign": "center",
 "width": "91.304%",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "height": "85.959%",
 "scrollBarMargin": 2,
 "gap": 3,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "class": "Container",
 "layout": "vertical",
 "data": {
  "name": "-button set"
 },
 "overflow": "scroll"
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_AF8D6ADA_B796_ACF4_41BB_69F1332061E8",
 "levels": [
  {
   "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A15EE878_B79A_EBB4_41D6_6371DBA60072",
 "levels": [
  {
   "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A0365391_B79A_5D75_41C2_71CBF751B0A0",
 "levels": [
  {
   "url": "media/panorama_BA0D5ED0_B77A_A4F3_41D3_BB071195C0F4_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_ABD7547E_B7B5_DBAC_41C5_F0F63359CC9F",
 "levels": [
  {
   "url": "media/panorama_BA27C986_B77A_6D5C_41C5_ACFF604A193B_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 1110
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A387CEB0_B775_A4B3_418E_C7A8FC22AFFD",
 "levels": [
  {
   "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A3871EB0_B775_A4B3_41D2_0670B822108C",
 "levels": [
  {
   "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A3843EB0_B775_A4B3_41DC_E8D9AA0BD418",
 "levels": [
  {
   "url": "media/panorama_BA2F8D25_B77A_A55D_41AA_E6265B3D768E_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_AF3085FA_B7BA_A4B7_41D9_8C1843D4F85C",
 "levels": [
  {
   "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 1110
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_AF3125FA_B7BA_A4B7_41D6_545957F88466",
 "levels": [
  {
   "url": "media/panorama_BA1C9F82_B77A_6554_41AE_554906F3D0D4_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 1110
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A883F373_B78A_5DB4_41E3_001FA08FD589",
 "levels": [
  {
   "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 1110
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A8824373_B78A_5DB4_41E6_59E3D1EB601E",
 "levels": [
  {
   "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 1110
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_9F0B2B90_B88A_ED73_41CB_103461CDC903",
 "levels": [
  {
   "url": "media/panorama_BA1D88E3_B77A_ACD4_41C1_EAA076265F22_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_9A0F4D02_B88E_A554_41DA_2EBBD1D02282",
 "levels": [
  {
   "url": "media/panorama_BA1EF22A_B77A_5F54_41DE_5E828FD76214_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A38B1EAE_B775_A4AF_41C7_FFADEC491FF2",
 "levels": [
  {
   "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A38ABEAE_B775_A4AF_41C6_C3F710435EBA",
 "levels": [
  {
   "url": "media/panorama_BA44459A_B775_E574_41C9_23F7475E5DA0_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A3F553A9_B78F_DD54_41D7_F1CF8DF2F61C",
 "levels": [
  {
   "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A3FAC3A9_B78F_DD54_41C8_B590D5B2E197",
 "levels": [
  {
   "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 1110
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A3FAB3A9_B78F_DD54_41C4_0690E314E68E",
 "levels": [
  {
   "url": "media/panorama_BA08FC12_B77A_EB77_41D4_21104B6E6E6A_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A384CEAF_B775_A4AD_41E5_9AF35AC45295",
 "levels": [
  {
   "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A3841EAF_B775_A4AD_41DD_C6D951DFD222",
 "levels": [
  {
   "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A387AEAF_B775_A4AD_41C7_4FB3FED529F7",
 "levels": [
  {
   "url": "media/panorama_BA2DF7C4_B77A_64DC_41AE_FA967A3DA3EA_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A385FEAF_B775_A4AD_41C0_1D198DA068AF",
 "levels": [
  {
   "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A3850EAF_B775_A4AD_41BC_AAEE34A48C77",
 "levels": [
  {
   "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A384AEAF_B775_A4AD_41E6_8D993BE690E1",
 "levels": [
  {
   "url": "media/panorama_BA3F01DE_B77A_5CEC_41DD_863A2C578BC5_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A1799420_B78A_BB53_41E3_63EC05D37B97",
 "levels": [
  {
   "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_ADDC03C7_B78D_BCDD_41C1_BD10FA7F615C",
 "levels": [
  {
   "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_AD4BDE02_B7B6_6757_41E5_BF16FB82C85D",
 "levels": [
  {
   "url": "media/panorama_BA1C05E2_B77A_64D4_41D2_1F26C9EBB556_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_AF8BCADC_B796_ACEC_41E0_B5D369D0B6DF",
 "levels": [
  {
   "url": "media/panorama_BA09F476_B77A_FBBC_41B4_317C6928F125_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A2CAC71E_B78B_E56C_41BD_407D1B819830",
 "levels": [
  {
   "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A2CA871E_B78B_E56C_41E0_03D9390BE62B",
 "levels": [
  {
   "url": "media/panorama_BA0B9584_B77A_E55C_41D1_1F42786C8AA5_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_AE02BA30_B796_6FB3_41BE_FFEA1D794615",
 "levels": [
  {
   "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_9D25E57F_B895_A5AC_41B0_A1B32D252A0C",
 "levels": [
  {
   "url": "media/panorama_B9A603A0_B77A_5D54_41AC_6ABE599648A4_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A3885EAD_B775_A4AD_41E2_08ED64B7C8C1",
 "levels": [
  {
   "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A38BDEAD_B775_A4AD_41D3_7B5CB5E45E72",
 "levels": [
  {
   "url": "media/panorama_BA3361C8_B775_BCD3_41E1_6D4B08775C60_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_9C855D72_B88B_A5B4_41DF_3330014E8F12",
 "levels": [
  {
   "url": "media/panorama_BA1F5C2E_B77A_6BAC_41D9_6BC7DA407FE5_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 1110
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_820C675C_943F_FBBA_41CF_32A3BCBEA56A",
 "levels": [
  {
   "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_820C375C_943F_FBBA_41C7_E376378015AE",
 "levels": [
  {
   "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_820DF75D_943F_FBBA_41C7_4DE82B7EFE23",
 "levels": [
  {
   "url": "media/panorama_9F63DAB8_93BB_D40D_41CD_C009A4D38558_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A3868EB1_B775_A4B5_41DC_CD47492F91D0",
 "levels": [
  {
   "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A386CEB1_B775_A4B5_41A3_102C06E2A4B0",
 "levels": [
  {
   "url": "media/panorama_BA9C1B56_B776_6DFF_41D9_C45D4F4C8CCC_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_8E12147D_9930_8423_41DE_0CBCCCC67073",
 "levels": [
  {
   "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_8E0DB47D_9930_8423_41D0_DACD3A2B35E2",
 "levels": [
  {
   "url": "media/panorama_92B5EB5A_992D_0A04_4196_9331249D9F48_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A385AEAE_B775_A4AF_41E2_59B3D6BB2E3F",
 "levels": [
  {
   "url": "media/panorama_BA2839CA_B775_ACD4_41D4_48F1497D2741_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_8E13047C_9930_8421_41B8_FD94137AAECF",
 "levels": [
  {
   "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_8E12D47C_9930_8421_41DC_253004F1ABE6",
 "levels": [
  {
   "url": "media/panorama_95857EB1_992D_0A04_41B1_25074D224AFF_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_AF195145_B78A_5DDC_41B9_3B0A7EB5C9DB",
 "levels": [
  {
   "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 1110
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A882F373_B78A_5DB4_41B7_B0A4B3D9FB9E",
 "levels": [
  {
   "url": "media/panorama_BA08F8DD_B77A_ACED_41BB_0FE9992A73A8_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 1110
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_8E12747C_9930_8421_41D9_7F916944FF84",
 "levels": [
  {
   "url": "media/panorama_92B575D9_992D_1E04_41C1_DDF5CEADAF13_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ]
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "id": "Container_7FF195EF_706F_7FC6_41D7_A104CA87824D",
 "left": "0%",
 "propagateClick": true,
 "width": 36,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000"
 ],
 "top": "0%",
 "horizontalAlign": "left",
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.4,
 "borderRadius": 0,
 "class": "Container",
 "layout": "absolute",
 "data": {
  "name": "Container black"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 80,
 "maxWidth": 80,
 "id": "IconButton_7FF185EF_706F_7FC6_41A5_21B418265412",
 "left": 0,
 "width": 66,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "40%",
 "iconURL": "skin/IconButton_7FF185EF_706F_7FC6_41A5_21B418265412.png",
 "bottom": "38.01%",
 "minWidth": 1,
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D, false, 0, null, null, false); this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, true, 0, this.effect_8B55582A_9422_359E_41B0_E759C423708C, 'showEffect', false)",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "class": "IconButton",
 "data": {
  "name": "IconButton arrow"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "propagateClick": true,
 "maxHeight": 1095,
 "maxWidth": 1095,
 "id": "Image_7DB3C373_7065_34DE_41BA_CF5206137DED",
 "left": "0%",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "url": "skin/Image_7DB3C373_7065_34DE_41BA_CF5206137DED.png",
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 30,
 "top": "0%",
 "verticalAlign": "middle",
 "minWidth": 40,
 "height": "25%",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "shadow": false,
 "class": "Image",
 "data": {
  "name": "Image Company"
 }
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_7DB3F373_7065_34CE_41B4_E77DDA40A4F3",
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_7DB3E382_7065_343F_41C2_E1E6BB5BA055",
  "this.Button_7DB31382_7065_343F_41D6_641BBE1B2562",
  "this.Container_7DB30382_7065_343F_416C_8610BCBA9F50",
  "this.Button_7DB33382_7065_343F_41B1_0B0F019C1828",
  "this.Container_7DB32382_7065_343F_419E_6594814C420F",
  "this.Button_7DB35382_7065_343F_41C5_CF0EAF3E4CFF",
  "this.Container_7DB34382_7065_343F_41CB_A5B96E9749EE",
  "this.Button_7DBC8382_7065_343F_4183_17B44518DB40",
  "this.Container_7DBCB382_7065_343F_41D8_AB382D384291"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "middle",
 "top": "25%",
 "width": "100%",
 "bottom": "25%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "gap": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "class": "Container",
 "layout": "vertical",
 "data": {
  "name": "-Container buttons"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_7DBCC382_7065_343F_41D5_9D3C36B5F479",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_8A8AF087_9422_5696_41D3_A5F682E98A53"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "horizontalAlign": "left",
 "width": "100%",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "bottom",
 "height": "26.316%",
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "class": "Container",
 "layout": "vertical",
 "data": {
  "name": "-Container footer"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_ABAEAD79_B78F_E5B5_41D7_E1D3FC906795",
 "left": "17.83%",
 "scrollBarColor": "#000000",
 "data": {
  "name": "Global"
 },
 "shadowColor": "#000000",
 "right": "16.15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_ABAEBD79_B78F_E5B5_41E1_5067C08D0AA4"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "top": "7%",
 "bottom": "7%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "shadowVerticalLength": 0,
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "class": "Container",
 "overflow": "visible",
 "shadow": true,
 "shadowHorizontalLength": 0,
 "layout": "vertical",
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "horizontalAlign": "left",
 "height": 140,
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "class": "Container",
 "layout": "absolute",
 "data": {
  "name": "header"
 },
 "overflow": "scroll"
},
{
 "itemThumbnailWidth": 220,
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "left": 0,
 "scrollBarColor": "#04A3E1",
 "itemMode": "normal",
 "itemLabelFontStyle": "normal",
 "scrollBarOpacity": 0.5,
 "itemLabelHorizontalAlign": "center",
 "itemMaxWidth": 1000,
 "scrollBarVisible": "rollOver",
 "rollOverItemThumbnailShadowColor": "#000000",
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemPaddingRight": 3,
 "itemMaxHeight": 1000,
 "horizontalAlign": "center",
 "minHeight": 1,
 "width": "100%",
 "paddingLeft": 70,
 "itemThumbnailOpacity": 1,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "verticalAlign": "middle",
 "rollOverItemThumbnailShadowHorizontalLength": 0,
 "itemLabelFontFamily": "Montserrat",
 "minWidth": 1,
 "itemBorderRadius": 0,
 "height": "92%",
 "itemPaddingLeft": 3,
 "itemHorizontalAlign": "center",
 "itemLabelPosition": "bottom",
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "selectedItemLabelFontColor": "#041C11",
 "itemOpacity": 1,
 "itemBackgroundOpacity": 0,
 "backgroundOpacity": 0,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "class": "ThumbnailGrid",
 "itemPaddingTop": 3,
 "itemThumbnailBorderRadius": 0,
 "itemBackgroundColor": [],
 "itemBackgroundColorRatios": [],
 "propagateClick": false,
 "shadow": false,
 "itemWidth": 220,
 "rollOverItemLabelFontWeight": "bold",
 "selectedItemThumbnailShadow": false,
 "itemMinHeight": 50,
 "borderSize": 0,
 "paddingRight": 70,
 "selectedItemLabelFontWeight": "bold",
 "itemLabelFontWeight": "normal",
 "itemLabelTextDecoration": "none",
 "rollOverItemLabelFontColor": "#041C11",
 "rollOverItemThumbnailShadow": false,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "bottom": -0.2,
 "itemLabelFontSize": "16.082600000000003px",
 "itemMinWidth": 50,
 "scrollBarMargin": 2,
 "itemVerticalAlign": "top",
 "itemLabelFontColor": "#041C11",
 "itemThumbnailScaleMode": "fit_outside",
 "itemHeight": 160,
 "rollOverItemBackgroundColor": [
  "#000000"
 ],
 "gap": 26,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailHeight": 125,
 "paddingTop": 10,
 "itemThumbnailShadow": false,
 "paddingBottom": 70,
 "borderRadius": 5,
 "rollOverItemBackgroundColorRatios": [
  0
 ],
 "itemPaddingBottom": 3,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "itemLabelGap": 7,
 "scrollBarWidth": 10,
 "data": {
  "name": "ThumbnailList"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "propagateClick": false,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "url": "https://www.google.com/maps/place/1%C2%B007'42.2%22N+104%C2%B003'37.6%22E/@1.1284007,104.0591625,568m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d1.128398!4d104.06045?entry=ttu&g_ep=EgoyMDI0MTAwOS4wIKXMDSoASAFQAw%3D%3D",
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "scrollEnabled": true,
 "minHeight": 1,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "insetBorder": false,
 "height": "100%",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "shadow": false,
 "class": "WebFrame",
 "data": {
  "name": "WebFrame48191"
 }
},
{
 "shadow": false,
 "propagateClick": false,
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "paddingRight": 20,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "right",
 "minHeight": 1,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "height": "100%",
 "gap": 10,
 "paddingTop": 20,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "class": "Container",
 "layout": "vertical",
 "data": {
  "name": "Container X global"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_25CBBDB2_3EC6_79AE_41B1_BA0DBC3B9FA5",
 "width": 60,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_25CBBDB2_3EC6_79AE_41B1_BA0DBC3B9FA5.png",
 "pressedRollOverIconURL": "skin/IconButton_25CBBDB2_3EC6_79AE_41B1_BA0DBC3B9FA5_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "height": 60,
 "click": "if(!this.Container_25CB4DB2_3EC6_79AE_41C5_F53BFB78DB4D.get('visible')){ this.setComponentVisibility(this.Container_25CB4DB2_3EC6_79AE_41C5_F53BFB78DB4D, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_25CB4DB2_3EC6_79AE_41C5_F53BFB78DB4D, false, 0, null, null, false) }",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_25CBBDB2_3EC6_79AE_41B1_BA0DBC3B9FA5_pressed.png",
 "class": "IconButton",
 "data": {
  "name": "image button menu"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_25CB3DB2_3EC6_79AE_41CC_FB28DBABC081",
 "width": 58,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_25CB3DB2_3EC6_79AE_41CC_FB28DBABC081.png",
 "minWidth": 1,
 "mode": "push",
 "height": 58,
 "click": "this.shareTwitter(window.location.href)",
 "rollOverIconURL": "skin/IconButton_25CB3DB2_3EC6_79AE_41CC_FB28DBABC081_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "class": "IconButton",
 "data": {
  "name": "IconButton TWITTER"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_25CACDB2_3EC6_79AE_41CD_E1A72433CDA0",
 "width": 58,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_25CACDB2_3EC6_79AE_41CD_E1A72433CDA0.png",
 "minWidth": 1,
 "mode": "push",
 "height": 58,
 "click": "this.shareFacebook(window.location.href)",
 "rollOverIconURL": "skin/IconButton_25CACDB2_3EC6_79AE_41CD_E1A72433CDA0_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "class": "IconButton",
 "data": {
  "name": "IconButton FB"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_7DB3E382_7065_343F_41C2_E1E6BB5BA055",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "horizontalAlign": "left",
 "height": 1,
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "class": "Container",
 "layout": "absolute",
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "pressedRollOverBackgroundColor": [
  "#000000"
 ],
 "textDecoration": "none",
 "id": "Button_7DB31382_7065_343F_41D6_641BBE1B2562",
 "pressedBackgroundColor": [
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "data": {
  "name": "Button Tour Info"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "pressedRollOverBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "paddingRight": 0,
 "width": "100%",
 "iconHeight": 32,
 "paddingLeft": 10,
 "rollOverFontColor": "#000000",
 "horizontalAlign": "left",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "backgroundColorDirection": "vertical",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "height": 50,
 "fontSize": "25px",
 "label": "The Rython",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, true, 0, null, null, false); this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, false, 0, null, null, false); this.setComponentVisibility(this.MapViewer, false, 0, null, null, false)",
 "fontStyle": "italic",
 "pressedFontColor": "#000000",
 "layout": "horizontal",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#FFFFFF"
 ],
 "pressedRollOverFontColor": "#FFFFFF",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "class": "Button",
 "rollOverBackgroundOpacity": 1,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_7DB30382_7065_343F_416C_8610BCBA9F50",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "horizontalAlign": "left",
 "height": 1,
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "class": "Container",
 "layout": "absolute",
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "pressedRollOverBackgroundColor": [
  "#000000"
 ],
 "textDecoration": "none",
 "id": "Button_7DB33382_7065_343F_41B1_0B0F019C1828",
 "rollOverBackgroundColor": [
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button Panorama List"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "borderSize": 0,
 "paddingRight": 0,
 "width": "100%",
 "iconHeight": 32,
 "paddingLeft": 10,
 "rollOverFontColor": "#000000",
 "horizontalAlign": "left",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "backgroundColorDirection": "vertical",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "height": 50,
 "fontSize": "25px",
 "label": "360 View",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 23,
 "click": "this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, false, 0, null, null, false); this.setComponentVisibility(this.MapViewer, false, 0, null, null, false); this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "fontStyle": "italic",
 "layout": "horizontal",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "class": "Button",
 "rollOverBackgroundOpacity": 1,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_7DB32382_7065_343F_419E_6594814C420F",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "horizontalAlign": "left",
 "height": 1,
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "class": "Container",
 "layout": "absolute",
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_7DB35382_7065_343F_41C5_CF0EAF3E4CFF",
 "width": "100%",
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "Button Location"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "borderSize": 0,
 "paddingRight": 0,
 "iconHeight": 32,
 "paddingLeft": 10,
 "rollOverFontColor": "#000000",
 "horizontalAlign": "left",
 "pressedLabel": "Location",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "backgroundColorDirection": "vertical",
 "minWidth": 1,
 "mode": "push",
 "height": 50,
 "fontSize": "25px",
 "label": "Location",
 "backgroundColor": [
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, true, 0, null, null, false); this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, false, 0, null, null, false); this.setComponentVisibility(this.MapViewer, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "class": "Button",
 "rollOverBackgroundOpacity": 1,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_7DB34382_7065_343F_41CB_A5B96E9749EE",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "horizontalAlign": "left",
 "height": 1,
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "class": "Container",
 "layout": "absolute",
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_7DBC8382_7065_343F_4183_17B44518DB40",
 "rollOverBackgroundColor": [
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button Photoalbum"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "borderSize": 0,
 "paddingRight": 0,
 "width": "100%",
 "iconHeight": 32,
 "paddingLeft": 10,
 "rollOverFontColor": "#000000",
 "horizontalAlign": "left",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "backgroundColorDirection": "vertical",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "height": 50,
 "fontSize": "25px",
 "label": "Photo Album",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, false, 0, null, null, false); this.setComponentVisibility(this.MapViewer, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "class": "Button",
 "rollOverBackgroundOpacity": 1,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_7DBCB382_7065_343F_41D8_AB382D384291",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "horizontalAlign": "left",
 "height": 1,
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "class": "Container",
 "layout": "absolute",
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 80,
 "maxWidth": 80,
 "id": "IconButton_8A8AF087_9422_5696_41D3_A5F682E98A53",
 "width": 64,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_8A8AF087_9422_5696_41D3_A5F682E98A53.png",
 "minWidth": 1,
 "mode": "push",
 "height": 63,
 "click": "this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D, true, 0, this.effect_B43C1B6A_9425_CB9E_41BF_EAB77416D59A, 'showEffect', false); this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, false, 0, this.effect_B772AD42_9426_4F8E_41D5_461A72C9274D, 'hideEffect', false)",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "class": "IconButton",
 "data": {
  "name": "IconButton collapse"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_ABAEBD79_B78F_E5B5_41E1_5067C08D0AA4",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.ViewerAreaLabeled_ABAE4D7A_B78F_E5B7_41DC_DEBF72A7639C",
  "this.IconButton_ABAE6D7A_B78F_E5B7_41D3_93A520575A96",
  "this.IconButton_ABAE7D7A_B78F_E5B7_41E0_6B4DB6A26A06",
  "this.IconButton_ABAE0D7A_B78F_E5B7_41E3_0F4FB331F4DE"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "horizontalAlign": "left",
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "class": "Container",
 "layout": "absolute",
 "data": {
  "name": "Container photo"
 },
 "overflow": "visible"
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "right": 20,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.png",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "right",
 "minHeight": 50,
 "top": 20,
 "width": "100%",
 "verticalAlign": "top",
 "minWidth": 50,
 "mode": "push",
 "height": "36.14%",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false); this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, true, 0, null, null, false); this.setComponentVisibility(this.MapViewer, true, 0, null, null, false)",
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.png",
 "class": "IconButton",
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand"
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.png",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 50,
 "width": "25%",
 "verticalAlign": "middle",
 "minWidth": 50,
 "mode": "push",
 "height": "75%",
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false); this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, true, 0, null, null, false); this.setComponentVisibility(this.MapViewer, true, 0, null, null, false)",
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.png",
 "class": "IconButton",
 "cursor": "hand",
 "data": {
  "name": "X"
 }
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_ABAE0D7A_B78F_E5B7_41E3_0F4FB331F4DE",
 "right": 20,
 "iconURL": "skin/IconButton_ABAE0D7A_B78F_E5B7_41E3_0F4FB331F4DE.png",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "right",
 "minHeight": 50,
 "top": 20,
 "width": "10%",
 "verticalAlign": "top",
 "minWidth": 50,
 "mode": "push",
 "height": "10%",
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false); this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, true, 0, null, null, false); this.setComponentVisibility(this.MapViewer, true, 0, null, null, false)",
 "rollOverIconURL": "skin/IconButton_ABAE0D7A_B78F_E5B7_41E3_0F4FB331F4DE_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_ABAE0D7A_B78F_E5B7_41E3_0F4FB331F4DE_pressed.png",
 "class": "IconButton",
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand"
}],
 "width": "100%",
 "layout": "absolute"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
