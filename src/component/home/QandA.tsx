'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const leftColumnFAQs: FAQItem[] = [
  {
    question: "When is the RSVP deadline?",
    answer: "Please RSVP by January 30th, 2026 so we can finalize our guest list and catering numbers."
  },
  {
    question: "What should I wear?",
    answer: "The dress code is Black Tie. Please refer to the Wedding Attire section for references and examples."
  },
  {
    question: "Can I send a gift if I can't attend?",
    answer: "Absolutely — your love and well-wishes mean the world to us. If you'd like, you can send your gift through our registry links."
  },
  {
    question: "Will there be professional photos shared later?",
    answer: "Yes, we'll share an online gallery after the wedding on our website, so everyone can enjoy the highlights."
  }
];

const rightColumnFAQs: FAQItem[] = [
  {
    question: "Can I bring a guest or plus one?",
    answer: "We'd love to celebrate with everyone we care about, but due to limited space, we're only able to accommodate the guests listed on your invitation."
  },
  {
    question: "Where is the ceremony and reception taking place?",
    answer: "The traditional wedding will be held at 38 Metropolitan Rd. The white wedding will be held at 2036 Millrace Crs. Directions and parking details are available on our \"Event Details\" page."
  },
  {
    question: "Can we share photos from the wedding on social media?",
    answer: "Please do! We'd love to see them — use our hashtag #IAlwaysHaveYourBakare so we can relive the memories with you."
  },
  {
    question: "What time should I arrive?",
    answer: "Traditional wedding - 5:45 PM to allow for parking and seating before the ceremony begins at 6PM. White wedding - 1:45PM to allow for parking and seating before the ceremony begins promptly at 2PM."
  }
];

function FAQItemComponent({ item, index, isOpen, onToggle }: { item: FAQItem; index: number; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="flex flex-col">
      <div 
        className="flex items-start justify-between cursor-pointer border]"
        onClick={onToggle}
      >
        <h4 className="text-c136207 font-nunito-700 md:font-nunito-900 text-lg md:text-xl pr-4 flex-1 leading-tight">
          {item.question}
        </h4>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="shrink-0 w-8 h-8 flex items-center justify-center cursor-pointer group relative mt-1"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Collapse answer' : 'Expand answer'}
        >
          <div className="w-4 h-0.5 rounded-2xl bg-c1e1e1e transition-opacity duration-300"></div>
          <div className={`absolute w-4 h-0.5 rounded-2xl bg-c1e1e1e transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}></div>
        </button>
      </div>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out flex-1 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-cb0b0b0 font-nunito-400 text-base md:text-lg leading-relaxed pt-2">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function QandA() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number, column: 'left' | 'right') => {
    const adjustedIndex = column === 'left' ? index : index + leftColumnFAQs.length;
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(adjustedIndex)) {
        newSet.delete(adjustedIndex);
      } else {
        newSet.add(adjustedIndex);
      }
      return newSet;
    });
  };

  return (
    <section className="px-5 pt-40.5 pb-[45px] md:pb-[221px]">
      <div className="max-w-282 mx-auto w-full">
        <div className="max-w-[563px] w-full mx-auto mb-[75px]">
          <h3 className="text-c75 text-c136207 font-greatvibes-400 text-center mb-[19px]">
            Q & A
          </h3>

          <p className="text-c1c1c1e font-nunito-400 text-xl text-center">
            For all our friends and family who have lots of questions, please
            check out our Q & A first!
          </p>
        </div>
      </div>

      <div className="py-[60px] md:px-10">
        <div className="max-w-282 mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12 md:items-start">
            {/* Left Column */}
            <div className="flex flex-col space-y-8 md:space-y-0">
              {leftColumnFAQs.map((item, index) => (
                <div key={index} className={index > 0 ? 'md:mt-[66px]' : ''}>
                  <FAQItemComponent
                    item={item}
                    index={index}
                    isOpen={openItems.has(index)}
                    onToggle={() => toggleItem(index, 'left')}
                  />
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="flex flex-col space-y-8 md:space-y-0 mt-8 md:mt-0">
              {rightColumnFAQs.map((item, index) => (
                <div key={index} className={index > 0 ? 'md:mt-[66px]' : ''}>
                  <FAQItemComponent
                    item={item}
                    index={index + leftColumnFAQs.length}
                    isOpen={openItems.has(index + leftColumnFAQs.length)}
                    onToggle={() => toggleItem(index, 'right')}
                  />
                </div>
              ))}
            </div>
            {/* <div className="space-y-[66px]">
              {rightColumnFAQs.map((item, index) => (
                <FAQItemComponent
                  key={index}
                  item={item}
                  index={index + leftColumnFAQs.length}
                  isOpen={openItems.has(index + leftColumnFAQs.length)}
                  onToggle={() => toggleItem(index, 'right')}
                />
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
