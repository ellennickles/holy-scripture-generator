# Generating Holy Scripture

Originally posted on December 13, 2018, for Neural Aesthetic @ NYU ITP Fall 2018

I’ve been thinking about meaningful datasets and what makes them so. I’ve also been thinking about this in the context of what might be more-or-less available to source. Sacred religious texts might meet both criteria. Faith is deeply personal to people and religious stories have been told since the beginning, yes?

## PART 1 - COLLECT THE DATA

According to these Pew Research reports from [2012](http://www.pewforum.org/2012/12/18/global-religious-landscape-exec/) and [2017](http://www.pewresearch.org/fact-tank/2017/04/05/christians-remain-worlds-largest-religious-group-but-they-are-declining-in-europe/), most people in the world belong to a religious group. In order of magnitude, the largest groups are Christians, Muslims, Hindus, and Buddhists. I tasked myself with finding significant scriptures for each of their religions.

In some cases this meant learning what those are in the first place and quickly realizing that it’s not necessarily an easy answer. Language, stories, and texts evolve and develop differently over time and geographies in their expressions and interpretations. Which scriptures are read and the particular versions varies by denomination.

For training a machine learning model, I looked for documents translated into English. Any translation raises questions of accuracy and meanings that are lost or gained. Then again, these stories have been a part of the written and oral traditions for so long; are they not already the result of thousands of years of human telephone?

In addition, I sought to find documents as digital text (not scanned books), “complete” texts (as opposed to selections), and those without commentary and analysis (at least for now).

So yeah, considering all of these points, it got complicated real quick. And once I knew what I was looking for, it wasn’t necessarily easy to find. I have more questions now since I started this attempt. This project is much larger in scope than for the short time that I currently have. Let’s just say, in ITP spirit, that this is an earnest prototype.

Problematic as it may be for a number of reasons, not in the least because I’m sure it’s grossly incomplete, here’s a list of what I managed to find and where I found it. I welcome any and all comments and suggestions.

### Christianity

[The King James Bible](http://www.gutenberg.org/cache/epub/10/pg10.txt) from [Project Gutenberg](http://www.gutenberg.org/wiki/Main_Page)

### Islam

The [Quran](http://www.islam101.com/quran/quranPickthal/trans-pickthal.text) translated by Mohammed Marmaduke Pickthall from [Islam101](http://www.islam101.com/quran/QTP/index.htm)

### Hinduism

1. [Four Vedas](https://archive.org/details/FourVedasEnglishTranslation/page/n1) from the [Internet Archive](https://archive.org/), includes:
   - Rig Veda translated by RT Griffith
   - Yajur Veda translated by AB Keith
   - Hymns of Sama Veda translated by RT Griffith
   - Hymns of Atharva Veda translated by M Bloomfied
2. [The Upanishads](http://www.gutenberg.org/cache/epub/3283/pg3283.txt) translated by Swami Paramananda from [Project Gutenberg](http://www.gutenberg.org/wiki/Main_Page)

### Buddhism

The [Tipitaka](https://en.wikipedia.org/wiki/Tripi%E1%B9%ADaka) or [The Pāli Canon](https://en.wikipedia.org/wiki/P%C4%81li_Canon) texts of the [Theravada](https://en.wikipedia.org/wiki/Theravada) tradition ([a reference chart](https://www.buddhismtoday.com/english/texts/index.html#map)), all below from [ReadingFaithfully.org](https://readingfaithfully.org/).

1. [Vinaya Pitaka](https://readingfaithfully.org/buddhist-stories-from-the-khandhakas-selections-from-the-book-of-the-discipline-epub-kindle/) (selections from) translated by I.B. Horner
2. Sutta Pitaka
   - [Dīghanikāya](https://readingfaithfully.org/digha-nikaya-translated-by-bhikkhu-sujato-free-epub-kindle-pdf/) (Long Discourses) translated by Sujato Bhikkhu for [SuttaCentral](https://suttacentral.net/home)
   - [Majjhimanikāya](https://readingfaithfully.org/majjhima-nikaya-translated-by-bhikkhu-sujato-free-epub-kindle-pdf/) (Middle Discourses) translated by Sujato Bhikkhu for [SuttaCentral](https://suttacentral.net/home)
   - [Samyuttanikāya](https://readingfaithfully.org/samyutta-nikaya-translated-bhikkhu-sujato-free-epub-kindle-pdf/) (Linked Discourses) translated by Sujato Bhikkhu for [SuttaCentral](https://suttacentral.net/home)
   - [Anguttaranikāya](https://readingfaithfully.org/anguttara-nikaya-translated-by-bhikkhu-sujato-free-epub-kindle-pdf/) (Numbered Discourses) translated by Sujato Bhikkhu for [SuttaCentral](https://suttacentral.net/home)
   - Khuddakanikāya (Short Discourses)
     - [Dhammapada](https://readingfaithfully.org/dhammapada-translated-by-acharya-buddharakkhita-kindle-epub-pdf-mp3/) translated by Acharya Buddharakkhita (1985 ePub version
     - [Itivuttaka](http://readingfaithfully.org/itivuttaka-the-buddhas-sayings-translated-by-john-d-ireland-epub-kindle-pdf/) translated by John D Ireland (Letter size PDF)
     - Khuddakapātha, Udāna, Sutta Nipata, Vimanavatthu, Petavatthu, Theragatha, Therigatha, and Jataka (do not have)
3. Abhidhamma Pitaka (do not have)

Here’s a comparison of the included texts: Christian 25%, Islamic 5%, Hindu 19%, and Buddhist 51%.

## PART II - PREPARE THE DATA

I collected eleven documents total. Those that I sourced as ePubs I converted to PDFs using this [online tool](https://ebook2pdf.com/). Then, I used Adobe Acrobat to convert all PDFs into Rich Text Format (RTF) files. Next, I used TextEdit to convert those to plain text files (Format > Make Plain Text) although I could have used textutil for this (a comparison later on showed no difference in the output). In some cases, such as for the Bible, the Qur’an, and the Upanishads, I used Text Wrangler to remove the artificial line breaks in the middle of the line (Text > Remove Line Breaks). I’m not sure what compelled me to make these decisions—perhaps muscle memory from my [previous charRNN tests](https://github.com/ellennickles/personalized-privacy-policy/blob/master/process.md)? It was useful to deal with each file individually at first to remove document details about where it came from (e.g. all the Project Gutenberg info) and the translators’ introductions and such. But maybe I should leave in this info? Thinking about [Caroline Sinders’ Feminist Data Set](https://carolinesinders.com/feminist-data-set/) work here.

The documents, when compared to one another, show variation in line spacing: some are single-spaced, others doubled, while others contain a mix. In the end, I decided to leave it—this will likely impact the look of the output results.

In addition, during the file format conversion many diacritics did not convert well. And so continues the story of translation and interpretation…

Following my notes from [before](https://github.com/ellennickles/personalized-privacy-policy/blob/master/process.md), I used [textutil](https://ss64.com/osx/textutil.html) to concatenate all files into one document titled input.txt: textutil -cat txt \*.txt

In the end, my dataset totaled ~18MB.

## PART III - TRAIN THE MODEL

As [before when working with text](https://github.com/ellennickles/personalized-privacy-policy/blob/master/process.md), I decided to use the [ml5js version](https://github.com/ml5js/training-lstm) of a Multi-layer Recurrent Neural Network (LSTM, RNN) in order to generate text at the character level. Many of my classmates have argued that this has been ineffective for them, but I was pleased with the results from my previous experiments so I’ll stick with it for now.

I also used [Spell.run](https://spell.run/) again because they provide access to clusters of GPUs for faster training than Paperspace. [Nabil Hassein’s tutorial](https://www.youtube.com/watch?v=0IeqAd2H57g) is an excellent resource for using Spell and training a LSTM model in the ml5js world. Here is a quick summary of my steps:

1. On my local computer, mkdir scripture
2. cd scripture
3. virtualenv env
4. source env/bin/activate
5. git clone https://github.com/ml5js/training-lstm.git
6. cd training-lstm/
7. mkdir data
8. mv input.txt into dir data
9. adjust the hyperparamters via nano run.sh (which lives inside training-lstm). Using [this as a reference](https://github.com/ml5js/training-lstm), I applied these settings for my 18MB file:

   ```python
   --rnn_size 1024 \
   --num_layers 3 \
   --seq_length 256 \
   --batch_size 128 \
   --num_epochs 50 \
   ```

10. pip install spell
11. spell login
12. enter username & password
13. spell upload data/input.txt
14. provide a directory name to store my data input file on spell, I wrote: uploads/scripture
15. request a machine type and initiate training! spell run -t V100x4 -m uploads/scripture:data “python train.py —-data_dir=./data”
16. fetch the model into the scripture dir (cd .. out of training-lstm): spell cp runs/11/models (11 is my run #)

Notes:

1. I selected the machine type V100x4 at \$12.24/hour
2. Start time: 04:24:51am
3. Finish time: 07:16:09am
4. Total cost: \$34.88

## PART IV - USE THE MODEL

Try it! [Holy Scripture Generator](https://ellennickles.github.io/holy-scripture-generator/)

[Input Text, Trained Model, and Site Code](https://github.com/ellennickles/holy-scripture-generator) on GitHub

## PART V - CONCLUSION

A short one: this experiment does not feel as successful as my previous ones. Perhaps the novelty wore off? Perhaps I need to retrain the model with different hyperparameters (lower the epochs?) to test the outputs? Something is off. But in the end, repeating the process of another LSTM was useful a practice and meditation on additional factors to consider when compiling a dataset.
