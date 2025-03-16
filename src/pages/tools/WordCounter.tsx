
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator } from 'lucide-react';

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');

  const getWordCount = () => text.trim().split(/\s+/).filter(Boolean).length;
  const getCharacterCount = () => text.length;
  const getSentenceCount = () => text.split(/[.!?]+/).filter(Boolean).length;
  const getParagraphCount = () => text.split(/\n\s*\n/).filter(Boolean).length;

  return (
    <>
      <Helmet>
        <title>Word Counter | Toolify</title>
        <meta name="description" content="Count words, characters, sentences and paragraphs in your text." />
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-20 animate-fade-in">
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-toolify-100 text-toolify-700 flex items-center justify-center">
                  <Calculator size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Word Counter</h1>
                  <p className="text-muted-foreground">
                    Count words, characters, sentences and paragraphs in your text.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <Textarea
                  placeholder="Type or paste your text here..."
                  className="min-h-[200px]"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold">{getWordCount()}</div>
                      <div className="text-sm text-muted-foreground">Words</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold">{getCharacterCount()}</div>
                      <div className="text-sm text-muted-foreground">Characters</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold">{getSentenceCount()}</div>
                      <div className="text-sm text-muted-foreground">Sentences</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold">{getParagraphCount()}</div>
                      <div className="text-sm text-muted-foreground">Paragraphs</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default WordCounter;
