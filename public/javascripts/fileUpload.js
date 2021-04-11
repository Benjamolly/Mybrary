const rootStyles = window.getComputedStyle(document.documentElement);
// This will get all the styles from the root element of our document (because css loads las this has to be done now). The root styles are all the styles inside the :root tag in the css files. 

if(rootStyles.getPropertyValue('--book-cover-width-large') != null && rootStyles.getPropertyValue('--book-cover-width-large') != '') {
    ready()
} else{
    document.getElementById('main-css')
    .addEventListener('load',ready)
}
// Above checks if the document is loaded and if not it waits for it to 'load' and then calls the ready function

function ready(){
    const coverWidth = parseFloat(rootStyles.getPropertyValue('--book-cover-width-large'))
    const coverAspectRatio = parseFloat(rootStyles.getPropertyValue('--book-cover-aspect-ratio'))
    const coverHeight = coverWidth/coverAspectRatio

    FilePond.registerPlugin(
        FilePondPluginFileEncode,
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        )
        
        FilePond.setOptions({
            stylePanelAspectRatio: 1/coverAspectRatio,
            imageResizeTargetWidth: coverWidth,
            imageResizeTargetHeight: coverHeight
        })
        
        FilePond.parse(document.body);
    }