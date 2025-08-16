<template>
  <div>
    <div class="flex flex-row justify-between flex-nowrap">
      <ButtonGroup data-trix-button-group="text-tools">
        <Button data-trix-attribute="bold" data-trix-key="b" aria-label="Bold" title="Bold">
          <Icon name="ph:text-b-bold" size="1.5rem" class="-mx-2 -my-1" />
        </Button>

        <Button data-trix-attribute="italic" data-trix-key="i" title="Italic" aria-label="Italic">
          <Icon name="ph:text-italic-bold" size="1.5rem" class="-mx-2 -my-1" />
        </Button>

        <Button data-trix-attribute="strike" title="Strikethrough" aria-label="Strikethrough">
          <Icon name="ph:text-strikethrough-bold" size="1.5rem" class="-mx-2 -my-1" />
        </Button>

        <Button data-trix-attribute="href" data-trix-action="link" data-trix-key="k" title="Link" aria-label="Link">
          <Icon name="ph:link-bold" size="1.5rem" class="-mx-2 -my-1" />
        </Button>
      </ButtonGroup>

      <ButtonGroup data-trix-button-group="block-tools">
        <Button data-trix-attribute="heading1" title="Heading" aria-label="Heading">
          <Icon name="ph:text-h-bold" size="1.5rem" class="-mx-2 -my-1" />
        </Button>

        <Button data-trix-attribute="quote" title="Quote" aria-label="Quote">
          <Icon name="ph:quotes-fill" size="1.5rem" class="-mx-2 -my-1" />
        </Button>

        <Button data-trix-attribute="code" title="Code" aria-label="Code">
          <Icon name="ph:code-bold" size="1.5rem" class="-mx-2 -my-1" />
        </Button>

        <Button data-trix-attribute="bullet" title="Bullets" aria-label="Bullets">
          <Icon name="ph:list-bullets-bold" size="1.5rem" class="-mx-2 -my-1" />
        </Button>

        <Button data-trix-attribute="number" title="Numbers" aria-label="Numbers">
          <Icon name="ph:list-numbers-bold" size="1.5rem" class="-mx-2 -my-1" />
        </Button>

        <Button data-trix-action="decreaseNestingLevel" title="Decrease Level" aria-label="Decrease Level">
          <Icon name="ph:text-outdent-bold" size="1.5rem" class="-mx-2 -my-1" />
        </Button>

        <Button data-trix-action="increaseNestingLevel" title="Increase Level" aria-label="Increase Level">
          <Icon name="ph:text-indent-bold" size="1.5rem" class="-mx-2 -my-1" />
        </Button>
      </ButtonGroup>

      <ButtonGroup data-trix-button-group="file-tools">
        <Button data-trix-action="attachFiles" title="Attach Files" aria-label="Attach Files">
          <Icon name="ph:paperclip-bold" size="1.5rem" class="-mx-2 -my-1" />
        </Button>
      </ButtonGroup>

      <ButtonGroup data-trix-button-group="history-tools">
        <Button data-trix-action="undo" data-trix-key="z" title="Undo" aria-label="Undo">
          <Icon name="ph:arrow-counter-clockwise-bold" size="1.5rem" class="-mx-2 -my-1" />
        </Button>

        <Button data-trix-action="redo" data-trix-key="shift+z" title="Redo" aria-label="Redo">
          <Icon name="ph:arrow-clockwise-bold" size="1.5rem" class="-mx-2 -my-1" />
        </Button>
      </ButtonGroup>
    </div>

    <div data-trix-dialogs>
      <Toolbar
        data-trix-dialog="href"
        data-trix-dialog-attribute="href"
        pt:start="grow"
        pt:center="hidden"
      >
        <template #start>
          <InputText
            type="url"
            name="href"
            placeholder="Enter a URL&hellip;"
            aria-label="URL"
            data-trix-validate-href
            required
            data-trix-input
            fluid
          />
        </template>

        <template #end>
          <ButtonGroup>
            <Button data-trix-method="setAttribute" size="small" label="Link" />

            <Button data-trix-method="removeAttribute" size="small" label="Unlink" />
          </ButtonGroup>
        </template>
      </Toolbar>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>