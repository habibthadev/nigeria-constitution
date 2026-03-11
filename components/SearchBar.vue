<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  matchCount: { type: Number, default: 0 },
  currentIndex: { type: Number, default: 0 },
})

const emit = defineEmits(['update:modelValue', 'search', 'next', 'prev', 'enter', 'clear'])

function onInput(e) {
  const val = e.target.value
  emit('update:modelValue', val)
  emit('search', val)
}

function onKeydown(e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    if (e.shiftKey) emit('prev')
    else emit('enter')
  } else if (e.key === 'Escape') {
    emit('clear')
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    emit('next')
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    emit('prev')
  }
}

function onClear() {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<template>
  <div class="search-bar-wrap">
    <div class="search-input-row">
      <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        :value="modelValue"
        type="search"
        placeholder="Search this chapter… (Enter to jump)"
        class="search-input"
        autocomplete="off"
        spellcheck="false"
        @input="onInput"
        @keydown="onKeydown"
      />
      <span v-if="matchCount > 0" class="match-count">
        {{ currentIndex + 1 }} / {{ matchCount }}
      </span>
      <span v-else-if="modelValue && modelValue.length >= 3" class="match-count no-match">
        0 results
      </span>
      <div v-if="matchCount > 0" class="nav-btns">
        <button class="nav-btn" title="Previous match (↑ or Shift+Enter)" @click="emit('prev')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m18 15-6-6-6 6"/></svg>
        </button>
        <button class="nav-btn" title="Next match (↓ or Enter)" @click="emit('next')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>
      <button v-if="modelValue" class="clear-btn" title="Clear (Esc)" @click="onClear">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.search-bar-wrap {
  width: 100%;
  margin-bottom: 1.5rem;
}
.search-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0 12px;
  transition: border-color 150ms;
}
.search-input-row:focus-within {
  border-color: var(--accent);
}
.search-icon {
  color: var(--text-muted);
  flex-shrink: 0;
}
.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 10px 0;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-primary);
}
.search-input::placeholder {
  color: var(--text-muted);
}
.search-input::-webkit-search-cancel-button {
  display: none;
}
.match-count {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--accent);
  white-space: nowrap;
  flex-shrink: 0;
}
.match-count.no-match {
  color: var(--text-muted);
}
.nav-btns {
  display: flex;
  gap: 2px;
  flex-shrink: 0;
}
.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: border-color 150ms, color 150ms;
}
.nav-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.clear-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: 4px;
  transition: color 150ms;
  flex-shrink: 0;
}
.clear-btn:hover {
  color: var(--text-primary);
}
</style>
