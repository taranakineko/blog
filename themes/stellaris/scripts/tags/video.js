/**
 * video.js v1 | https://github.com/YidaozhanYa/hexo-theme-stellaris
 * {% video src [ratio:aspect-ratio] %}
 */


'use strict';

hexo.extend.tag.register('video', (args) => {
    args = hexo.args.map(args, ['ratio'], ['src'])
    return `
<script src="https://cdn.bootcdn.net/ajax/libs/artplayer/4.6.2/artplayer.min.js"></script>
<style>
    .video-div {
        width: 100%;
        aspect-ratio: ${args.ratio || '16 / 9'};
        border-radius: 4px;
    }
</style>
<div class="video-div" id="artplayer-app">
    加载中 ...
</div>
<script defer>
    function initVideo() {
        try {
        	let art = new Artplayer({
	            container: '#artplayer-app',
	            url: '${args.src}',
	            hotkey: true,
	            fullscreen: true,
	            fullscreenWeb: true
	        });
        } catch (e) {
            if (e instanceof ReferenceError) {
                setTimeout(() => {
                    initVideo()
                }, 100)
            }
        }
    }
    try {
        InstantClick.on('change', () => {
            initVideo()
    	})
    } catch (e) {
    	initVideo()
    }
</script>
    `
})
