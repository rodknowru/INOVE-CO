'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
// TODO: получить бесплатный ключ на dadata.ru (бесплатно 10 000 запросов/день)
const DADATA_API_KEY = process.env.NEXT_PUBLIC_DADATA_API_KEY ?? ''

type Suggestion = {
  value: string
  data: {
    city?: string
    postal_code?: string
  }
}

async function fetchCitySuggestions(query: string): Promise<Suggestion[]> {
  if (!DADATA_API_KEY || query.trim().length < 2) return []
  try {
    const res = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${DADATA_API_KEY}`,
      },
      body: JSON.stringify({
        query: query.trim(),
        count: 5,
        from_bound: { value: 'city' },
        to_bound: { value: 'city' },
      }),
    })
    if (!res.ok) return []
    const data = await res.json()
    if (!data || typeof data !== 'object' || !Array.isArray(data.suggestions)) return []
    return data.suggestions
  } catch {
    return []
  }
}

type CityInputProps = {
  value: string
  onChange: (value: string) => void
  onSelectSuggestion?: (city: string, postalCode: string) => void
  onBlur?: () => void
  placeholder?: string
  maxLength?: number
  className?: string
  id?: string
  'aria-invalid'?: boolean
}

export default function CityInput({
  value,
  onChange,
  onSelectSuggestion,
  onBlur,
  placeholder = 'Москва',
  maxLength = 100,
  className,
  id,
  'aria-invalid': ariaInvalid,
}: CityInputProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Debounce 300ms
  useEffect(() => {
    if (value.trim().length < 2) {
      setSuggestions([])
      setOpen(false)
      return
    }
    const t = setTimeout(() => setDebouncedQuery(value.trim()), 300)
    return () => clearTimeout(t)
  }, [value])

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setSuggestions([])
      return
    }
    let cancelled = false
    fetchCitySuggestions(debouncedQuery).then((list) => {
      if (!cancelled) {
        setSuggestions(list)
        setOpen(list.length > 0)
        setHighlightIndex(-1)
      }
    })
    return () => { cancelled = true }
  }, [debouncedQuery])

  const handleSelect = useCallback(
    (s: Suggestion) => {
      const city = s.data?.city ?? s.value.replace(/^г\s+/i, '').trim()
      const postalCode = s.data?.postal_code ?? ''
      onChange(city)
      if (onSelectSuggestion && postalCode) onSelectSuggestion(city, postalCode)
      setOpen(false)
      setSuggestions([])
    },
    [onChange, onSelectSuggestion]
  )

  const handleBlur = useCallback(() => {
    setTimeout(() => setOpen(false), 150)
    onBlur?.()
  }, [onBlur])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open || suggestions.length === 0) {
        if (e.key === 'Escape') setOpen(false)
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlightIndex((i) => (i < suggestions.length - 1 ? i + 1 : i))
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightIndex((i) => (i > 0 ? i - 1 : -1))
        return
      }
      if (e.key === 'Enter' && highlightIndex >= 0 && suggestions[highlightIndex]) {
        e.preventDefault()
        handleSelect(suggestions[highlightIndex])
        return
      }
      if (e.key === 'Escape') {
        setOpen(false)
        setHighlightIndex(-1)
      }
    },
    [open, suggestions, highlightIndex, handleSelect]
  )

  useEffect(() => {
    if (highlightIndex >= 0 && listRef.current) {
      const el = listRef.current.children[highlightIndex] as HTMLElement
      el?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightIndex])

  return (
    <div ref={wrapperRef} className="relative">
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        maxLength={maxLength}
        className={className}
        aria-invalid={ariaInvalid}
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={open ? 'city-suggestions-list' : undefined}
      />
      {open && suggestions.length > 0 && (
        <ul
          id="city-suggestions-list"
          ref={listRef}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-0 overflow-hidden font-sans text-sm text-[#3C3228]"
          style={{
            background: '#FDFBF8',
            border: '1px solid #D5CBBD',
            borderTop: 'none',
            borderRadius: '0 0 8px 8px',
            boxShadow: '0 4px 12px rgba(60,50,40,0.1)',
          }}
        >
          {suggestions.map((s, i) => (
            <li
              key={s.value + String(i)}
              role="option"
              aria-selected={i === highlightIndex}
              className="cursor-pointer px-4 py-3 transition-colors"
              style={{
                padding: '12px 16px',
                fontSize: '14px',
                background: i === highlightIndex ? '#F0EAE2' : undefined,
              }}
              onMouseEnter={() => setHighlightIndex(i)}
              onMouseLeave={() => setHighlightIndex(-1)}
              onMouseDown={(e) => {
                e.preventDefault()
                handleSelect(s)
              }}
            >
              {s.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
