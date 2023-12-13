import translations from "./translations";

export default function customTranslation(template, replacements) {
    replacements = replacements || {};

    // Translate
    template = translations[template] || template;

    // Replace
    return template.replace(/{([^}]+)}/g, function (_, key) {
        return replacements[key] || "{" + key + "}";
    });
}
