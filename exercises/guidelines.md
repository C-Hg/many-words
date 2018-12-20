# How to add new words to a lesson

1. create a new folder for a lesson if needed
1. copy the word template once for each word in the lesson
1. **refer to already filled templates to get a good understanding!**

## Detailled instructions for the word template

- always write plain words, without quotes ("")
- words can have several parts like "to walk" or "après-midi"
- words are registered case-sensitively so capitalization should concern only words that always need to be capitalized e.g "Brazil"
- do not modify the template, the Markdown parser relies on it to properly seed the database

### General data

unique form

- the answer should be true or blank for false, any value different from true will be considered false
- true means that every word including alternatives have only one form, verbs for example or invariable words; in this case, **only** the field _unique form_ of the table should be filled
- adjectives should have _unique form : false_, because the french adjectives have 4 forms, but the English form should be filled in the unique form field of the table; it is the **only** case where one word is in the unique form field in one language and not in the other

type

- simply fill in the type : noun, adjective, verb...

### English data

name

- the main form of the word

table

- either fill in the two lines singular and plural, or if only one form exists, fill in the unique form line
- leave a cross _'x'_ or _'true'_ in the last line if the noun has an indefinite article of form "an"

### French data

name

- the main form of the word

table

- either fill all the possible forms for a word, or if only one form exists, fill in the unique form line
- leave a cross _x_ or _true_ in the last line if the noun has a definite article of form "l'"
