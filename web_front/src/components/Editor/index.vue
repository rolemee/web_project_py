<script setup name="Editor">
import tinymce from 'tinymce/tinymce'
import TinymceEditor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default/icons'
import 'tinymce/models/dom'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/image'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/table'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/code'
import 'tinymce/plugins/searchreplace'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    setting: {
        type: Object,
        default: () => {}
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue', 'uploadImage'])

const defaultSetting = ref({
    language_url: 'tinymce/langs/zh-Hans.js',
    language: 'zh-Hans',
    skin_url: 'tinymce/skins/ui/oxide',
    content_css: 'tinymce/skins/content/default/content.min.css',
    min_height: 250,
    max_height: 600,
    selector: 'textarea',
    plugins: 'autolink autoresize fullscreen image insertdatetime link lists media preview table wordcount code searchreplace',
    toolbar: 'undo redo | image  insertdatetime searchreplace | preview',
    branding: false,
    menubar: false,
    toolbar_mode: 'sliding',
    insertdatetime_formats: [
        '%Y年%m月%d日',
        '%H点%M分%S秒',
        '%Y-%m-%d',
        '%H:%M:%S'
    ],
    images_upload_handler: blobInfo => new Promise((resolve, reject) => {
        console.log(blobInfo)
        emit('uploadImage', blobInfo, state => {
            if (state.status === 200) {
                const img = state.imageUrl
                console.log(img)
                resolve(img)
            } else {
                reject('图片上传失败')
            }
        })
    })
})

const myValue = ref(props.modelValue)

const completeSetting = computed(() => {
    return Object.assign(defaultSetting.value, props.setting)
})

watch(() => myValue.value, newValue => {
    console.log(myValue.value)
    emit('update:modelValue', newValue)
})

watch(() => props.modelValue, newValue => {
    myValue.value = newValue
})

onMounted(() => {
    // console.log(Object.assign(defaultSetting.value, props.setting))
    tinymce.init({})
})
</script>

<template>
    <div class="editor">
        <TinymceEditor v-model="myValue" :init="completeSetting" :disabled="disabled" />
    </div>
</template>

<style lang="scss" scoped>
:deep(.tox-tinymce) {
    border-radius: 4px;
}
</style>
