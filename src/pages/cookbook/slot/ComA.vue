<template>
    <div class="comA">
        <slot>default content</slot>
        <slot name="head"></slot>
        <slot name="body" :bodyProp="'bodyProp'"></slot>
    </div>
</template>
