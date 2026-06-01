import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

function isCloneSlashCommand(item: { value: string; label: string }): boolean {
	return item.value === "clone" || item.label === "clone";
}

export default function hideCloneAutocomplete(pi: ExtensionAPI) {
	pi.on("session_start", (_event, ctx) => {
		ctx.ui.addAutocompleteProvider((current) => ({
			async getSuggestions(lines, cursorLine, cursorCol, options) {
				const suggestions = await current.getSuggestions(lines, cursorLine, cursorCol, options);
				if (!suggestions || !suggestions.prefix.startsWith("/")) return suggestions;

				const items = suggestions.items.filter((item) => !isCloneSlashCommand(item));
				return items.length > 0 ? { ...suggestions, items } : null;
			},

			applyCompletion(lines, cursorLine, cursorCol, item, prefix) {
				return current.applyCompletion(lines, cursorLine, cursorCol, item, prefix);
			},

			shouldTriggerFileCompletion(lines, cursorLine, cursorCol) {
				return current.shouldTriggerFileCompletion?.(lines, cursorLine, cursorCol) ?? true;
			},
		}));
	});
}
