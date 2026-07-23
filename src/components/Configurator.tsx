import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, Calculator, ArrowRight, HelpCircle, FileText, BadgePercent } from 'lucide-react';

export default function Configurator() {
  // Config state
  const [category, setCategory] = useState('packaging');
  const [paperWeight, setPaperWeight] = useState('350gsm');
  const [finish, setFinish] = useState('gold-foil');
  const [quantity, setQuantity] = useState(500);
  const [designSupport, setDesignSupport] = useState(false);
  
  // Lead submission form
  const [submitted, setSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', note: '' });

  // Categories config
  const categories = [
    { id: 'packaging', label: 'Packaging Box', basePrice: 2.80, minQty: 50 },
    { id: 'stationery', label: 'Business Stationery', basePrice: 0.65, minQty: 100 },
    { id: 'marketing', label: 'Marketing Catalog', basePrice: 1.45, minQty: 100 },
    { id: 'largeformat', label: 'Large Format Banner', basePrice: 12.00, minQty: 1 }
  ];

  // Paper Weight configurations
  const weights = [
    { id: '150gsm', label: '150gsm Silk Text (Light Weight)', factor: 0.8 },
    { id: '300gsm', label: '300gsm Premium Matte (Standard)', factor: 1.0 },
    { id: '350gsm', label: '350gsm Heavy Artboard (Thick)', factor: 1.2 },
    { id: '700gsm', label: '700gsm Duplex Cotton (Luxury)', factor: 2.2 }
  ];

  // Premium finishing options
  const finishes = [
    { id: 'standard', label: 'Standard Matte Lamination', pricePerUnit: 0.00, description: 'Sleek, shine-free protective coating' },
    { id: 'gold-foil', label: 'Hot Gold Foil Stamping', pricePerUnit: 0.75, description: 'Metallic gold foil heat-pressed on stock' },
    { id: 'spot-uv', label: 'High-Gloss Spot UV', pricePerUnit: 0.40, description: 'Raised, ultra-glossy varnish highlights' },
    { id: 'debossing', label: 'Deep Blind Debossing', pricePerUnit: 0.60, description: 'Elegant physical impression into heavy cotton' },
    { id: 'painted-edges', label: 'Painted Edge Gilding', pricePerUnit: 0.90, description: 'Metallic gilded side edges on heavy cardstock' }
  ];

  // Dynamic calculations via useMemo
  const calculation = useMemo(() => {
    const selectedCat = categories.find(c => c.id === category) || categories[0];
    const selectedWeight = weights.find(w => w.id === paperWeight) || weights[1];
    const selectedFinish = finishes.find(f => f.id === finish) || finishes[0];

    // Ensure quantity is not less than category minQty
    const validQty = Math.max(quantity, selectedCat.minQty);

    // Dynamic base pricing formula with bulk discount factors
    let unitCost = selectedCat.basePrice * selectedWeight.factor + selectedFinish.pricePerUnit;
    
    // Bulk volume discount scaling
    let volumeDiscount = 0;
    if (validQty >= 2500) {
      unitCost *= 0.70; // 30% off
      volumeDiscount = 30;
    } else if (validQty >= 1000) {
      unitCost *= 0.80; // 20% off
      volumeDiscount = 20;
    } else if (validQty >= 500) {
      unitCost *= 0.90; // 10% off
      volumeDiscount = 10;
    }

    if (designSupport) {
      unitCost += 150 / validQty; // Flat $150 designer set-up distributed
    }

    const subtotal = unitCost * validQty;
    const setups = designSupport ? 150.00 : 0.00;
    const total = subtotal;

    // Estimating processing duration
    let turnaround = 5; // standard
    if (category === 'packaging') turnaround += 2;
    if (finish !== 'standard') turnaround += 1;
    if (designSupport) turnaround += 2;

    return {
      unitPrice: unitCost.toFixed(2),
      totalPrice: total.toFixed(2),
      turnaroundDays: turnaround,
      discount: volumeDiscount,
      setups: setups.toFixed(2)
    };
  }, [category, paperWeight, finish, quantity, designSupport]);

  // Form submission handler
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadForm.name && leadForm.email) {
      setSubmitted(true);
    }
  };

  const currentCategoryLabel = categories.find(c => c.id === category)?.label || 'Product';
  const currentFinishObj = finishes.find(f => f.id === finish) || finishes[0];

  return (
    <section id="print-configurator-section" className="py-24 bg-neutral-50 border-t border-b border-neutral-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-neutral-900 text-white rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Estimator</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            Configure Your Custom Printing Run
          </h2>
          <p className="text-neutral-600 font-sans text-base sm:text-lg">
            Select your premium options, tweak quantities, and preview mock-up configurations. See immediate transparent bulk pricing. No hidden fees, FSC sustainable papers.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Controls Column (left 7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-sm space-y-8">
            
            {/* Step 1: Category selection */}
            <div className="space-y-3.5">
              <label className="block text-sm font-semibold text-neutral-800 uppercase tracking-wider font-mono">
                01. Select Product Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categories.map((cat) => (
                  <button
                    id={`config-category-${cat.id}`}
                    key={cat.id}
                    onClick={() => {
                      setCategory(cat.id);
                      // Reset quantity to at least min if current is lower
                      if (quantity < cat.minQty) {
                        setQuantity(cat.minQty);
                      }
                    }}
                    className={`p-3.5 rounded-xl border text-center transition-all flex flex-col justify-between h-24 cursor-pointer ${
                      category === cat.id
                        ? 'bg-neutral-950 border-neutral-950 text-white shadow-md'
                        : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700'
                    }`}
                  >
                    <span className="text-xs font-semibold block">{cat.label}</span>
                    <span className={`text-[10px] block font-mono ${category === cat.id ? 'text-cyan-400' : 'text-neutral-500'}`}>
                      Min: {cat.minQty} units
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Paper Stock Weight */}
            <div className="space-y-3.5">
              <label className="block text-sm font-semibold text-neutral-800 uppercase tracking-wider font-mono">
                02. Choose Paper Stock Weight
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {weights.map((w) => (
                  <button
                    id={`config-weight-${w.id}`}
                    key={w.id}
                    onClick={() => setPaperWeight(w.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      paperWeight === w.id
                        ? 'bg-neutral-950 border-neutral-950 text-white shadow-sm'
                        : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700'
                    }`}
                  >
                    <span className="text-sm font-medium">{w.label}</span>
                    {paperWeight === w.id && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Luxury Finishing */}
            <div className="space-y-3.5">
              <label className="block text-sm font-semibold text-neutral-800 uppercase tracking-wider font-mono">
                03. Select Premium Specialty Finish
              </label>
              <div className="space-y-2.5">
                {finishes.map((f) => (
                  <button
                    id={`config-finish-${f.id}`}
                    key={f.id}
                    onClick={() => setFinish(f.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      finish === f.id
                        ? 'bg-neutral-950 border-neutral-950 text-white shadow-sm'
                        : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700'
                    }`}
                  >
                    <div className="space-y-0.5 max-w-[85%]">
                      <span className="text-sm font-semibold block">{f.label}</span>
                      <span className={`text-xs block ${finish === f.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {f.description}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      <span className={`text-xs font-mono font-medium ${finish === f.id ? 'text-cyan-300' : 'text-neutral-500'}`}>
                        {f.pricePerUnit === 0 ? 'Included' : `+$${f.pricePerUnit.toFixed(2)}/unit`}
                      </span>
                      {finish === f.id ? (
                        <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-neutral-300" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Run Size Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-neutral-800 uppercase tracking-wider font-mono">
                  04. Quantity (Run Size)
                </label>
                <span className="text-lg font-bold font-mono text-neutral-950 bg-neutral-100 px-3 py-1 rounded-lg">
                  {quantity} units
                </span>
              </div>
              <input
                id="config-qty-slider"
                type="range"
                min={categories.find(c => c.id === category)?.minQty || 50}
                max={5000}
                step={50}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-900"
              />
              <div className="flex justify-between text-[11px] font-mono text-neutral-500 font-medium">
                <span>Min ({categories.find(c => c.id === category)?.minQty || 50})</span>
                <span>1,000 (Bulk 20% off)</span>
                <span>2,500 (Enterprise 30% off)</span>
                <span>5,000+ (Call)</span>
              </div>
            </div>

            {/* Step 5: Design services */}
            <div className="pt-4 border-t border-neutral-200/60">
              <label className="relative flex items-start space-x-3 cursor-pointer select-none">
                <input
                  id="config-design-support"
                  type="checkbox"
                  checked={designSupport}
                  onChange={(e) => setDesignSupport(e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded border-neutral-300 text-neutral-950 focus:ring-neutral-900 cursor-pointer"
                />
                <div className="space-y-0.5">
                  <span className="text-sm font-semibold text-neutral-800 block">Add Professional Structural Prepress Check &amp; Setup support</span>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Our packaging structural engineer will customize and review your dielines. Includes a printed flat mock-up shipped to your location for <strong>$150.00 flat setup fee</strong>.
                  </p>
                </div>
              </label>
            </div>

          </div>

          {/* Estimates Card / Live Preview Sticky Col (right 5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            
            {/* Real-time estimator output */}
            <div className="bg-neutral-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl" />
              
              <h3 className="font-display font-semibold text-lg text-white mb-6 border-b border-neutral-900 pb-3 flex items-center justify-between">
                <span>Instant Estimate Summary</span>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider bg-cyan-950/60 px-2.5 py-1 rounded-md">
                  Active
                </span>
              </h3>

              {/* Estimate Metrics Grid */}
              <div className="space-y-5">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-neutral-400 font-medium">Product Category</span>
                  <span className="text-sm font-semibold text-white capitalize">{currentCategoryLabel}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-neutral-400 font-medium">Selected Finish</span>
                  <span className="text-sm font-semibold text-neutral-200">{currentFinishObj.label}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-neutral-400 font-medium">Paper Weight</span>
                  <span className="text-sm font-mono text-neutral-200">{paperWeight}</span>
                </div>
                
                {calculation.discount > 0 && (
                  <div className="flex justify-between items-center bg-cyan-950/40 border border-cyan-900/40 p-2.5 rounded-xl">
                    <span className="text-xs text-cyan-400 font-mono font-bold flex items-center gap-1">
                      <BadgePercent className="w-4 h-4" />
                      Bulk Volume Discount
                    </span>
                    <span className="text-xs font-bold font-mono text-cyan-400">-{calculation.discount}%</span>
                  </div>
                )}

                <div className="border-t border-neutral-900 pt-5 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-neutral-300">Unit Price estimate</span>
                    <span className="text-lg font-bold font-mono text-white">${calculation.unitPrice}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="text-base font-bold text-white block">Estimated Total</span>
                      <span className="text-[10px] text-neutral-500 font-mono">Excluding freight courier dispatch</span>
                    </div>
                    <span className="text-3xl font-extrabold font-mono text-cyan-400">${calculation.totalPrice}</span>
                  </div>
                </div>

                <div className="border-t border-neutral-900 pt-4 flex justify-between items-center text-xs text-neutral-400">
                  <span>Press Lead-time:</span>
                  <span className="font-semibold text-neutral-200 bg-neutral-900 px-2.5 py-1 rounded-md">
                    ~{calculation.turnaroundDays} business days
                  </span>
                </div>
              </div>
            </div>

            {/* Dynamic Visual Mock-Up Rendering */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm space-y-4">
              <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest font-mono">
                Live Dynamic Card Preview
              </h4>
              
              {/* Product Card Rendering */}
              <div className="relative h-44 rounded-xl border border-neutral-200 overflow-hidden bg-neutral-50 p-5 flex flex-col justify-between shadow-inner">
                
                {/* Background specialty styling based on selected finish */}
                {finish === 'gold-foil' && (
                  <div className="absolute inset-1 rounded-lg border-2 border-amber-400/70 pointer-events-none" />
                )}
                {finish === 'painted-edges' && (
                  <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 pointer-events-none" />
                )}
                {finish === 'spot-uv' && (
                  <div className="absolute top-2 right-2 w-16 h-16 bg-white/20 rounded-full blur-sm border border-neutral-300/40 pointer-events-none" />
                )}

                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block tracking-widest">
                      PRINTOPIA PROOF
                    </span>
                    <span className="text-base font-bold text-neutral-950 font-display">
                      {currentCategoryLabel} Run
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono bg-neutral-900 text-white px-2 py-0.5 rounded uppercase">
                      {paperWeight}
                    </span>
                  </div>
                </div>

                {/* Accent description representing foil stamping or debossing */}
                <div className="py-2">
                  <div className="text-xs font-mono font-medium text-neutral-600 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Finish: <strong className="text-neutral-900">{currentFinishObj.label}</strong></span>
                  </div>
                  <span className="text-[11px] text-neutral-400 block mt-0.5 leading-tight">
                    Prepress check: {designSupport ? 'Professional Assisted Setup' : 'Auto-flight Checklist'}
                  </span>
                </div>

                <div className="flex justify-between items-end text-[10px] font-mono text-neutral-500 border-t border-neutral-200/50 pt-2">
                  <span>QTY: <strong>{quantity} pcs</strong></span>
                  <span className="text-neutral-900 font-semibold">EST. TURNAROUND: {calculation.turnaroundDays} DAYS</span>
                </div>
              </div>
            </div>

            {/* Lead Form Submission Box */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="lead-form"
                    onSubmit={handleLeadSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-sm font-semibold text-neutral-800">
                      Lock configuration and request digital proofs
                    </h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Send this blueprint to our printing engineering desks. We will reach back within 2 business hours with dynamic proof setups.
                    </p>
                    <div className="space-y-3">
                      <div>
                        <input
                          id="lead-name"
                          type="text"
                          required
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                          placeholder="Your Name..."
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          id="lead-email"
                          type="email"
                          required
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          placeholder="Business Email..."
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                        />
                      </div>
                      <div>
                        <textarea
                          id="lead-note"
                          rows={2}
                          value={leadForm.note}
                          onChange={(e) => setLeadForm({ ...leadForm, note: e.target.value })}
                          placeholder="Add special requests (e.g. customized dimensions, spot pantones)..."
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors resize-none"
                        />
                      </div>
                    </div>
                    <button
                      id="lead-submit-btn"
                      type="submit"
                      className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span>Request Free Sample Proof</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-form"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-4"
                  >
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-neutral-900">Blueprint Locked successfully!</h4>
                      <p className="text-xs text-neutral-500 px-4">
                        Thank you, <strong>{leadForm.name}</strong>. Our prepress specialist is reviewing this configuration, and we sent a verification email to <strong>{leadForm.email}</strong>.
                      </p>
                    </div>
                    <button
                      id="reset-config-btn"
                      onClick={() => {
                        setSubmitted(false);
                        setLeadForm({ name: '', email: '', note: '' });
                      }}
                      className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 underline focus:outline-none cursor-pointer"
                    >
                      Configure Another Run
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
