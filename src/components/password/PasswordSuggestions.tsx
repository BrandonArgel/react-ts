import { motion, AnimatePresence } from 'framer-motion'
import { PasswordSuggestion } from '@features/password-generator/types'

interface PasswordSuggestionsProps {
  password: string
  suggestions: PasswordSuggestion[]
}

export const PasswordSuggestions = ({ password, suggestions }: PasswordSuggestionsProps) => {
  return (
    <div className="space-y-2 mt-4">
      <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Recommendations</p>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {suggestions.map((suggestion) => (
            <motion.span
              key={suggestion.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="px-2 py-1 rounded-md bg-surface border border-border text-[10px] text-gray-400 flex items-center gap-1"
            >
              <span className="w-1 h-1 rounded-full bg-red-500" />
              {suggestion.message}
            </motion.span>
          ))}
        </AnimatePresence>

        {suggestions.length === 0 && password.length > 0 && (
          <p className="text-[10px] text-green-500 font-medium">Excellent! Your password meets all the standards.</p>
        )}
      </div>
    </div>
  )
}
