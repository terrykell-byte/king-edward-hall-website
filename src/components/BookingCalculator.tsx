import { useState, useId, useEffect, useRef } from 'react'
import { 
  ROOM_RATES, 
  KITCHEN_RATES, 
  EQUIPMENT_RATES, 
  calculateHireQuote, 
  generateInquiryMailto,
  formatInquiryPlainText,
  RoomId, 
  KitchenId,
  EquipmentId
} from '../domain/pricing'
import { 
  Calendar, 
  Clock, 
  Users, 
  Utensils, 
  CheckCircle, 
  AlertTriangle, 
  Send, 
  Sparkles, 
  Info,
  Mic,
  Repeat,
  Minus,
  Plus,
  Copy,
  Check,
  ArrowDown
} from 'lucide-react'

interface BookingCalculatorProps {
  initialRoomId?: RoomId
  showMobileStickyBar?: boolean
}

export const BookingCalculator: React.FC<BookingCalculatorProps> = ({
  initialRoomId = 'newcombe',
  showMobileStickyBar = true
}) => {
  const [roomId, setRoomId] = useState<RoomId>(initialRoomId)

  useEffect(() => {
    setRoomId(initialRoomId)
  }, [initialRoomId])

  // Default to a Saturday 3 weeks ahead
  const defaultDate = new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  const [date, setDate] = useState<string>(defaultDate)
  const [startTime, setStartTime] = useState<string>('14:00')
  const [durationHours, setDurationHours] = useState<number>(4)
  const [kitchenId, setKitchenId] = useState<KitchenId>('none')
  const [equipmentIds, setEquipmentIds] = useState<EquipmentId[]>([])
  const [guestCount, setGuestCount] = useState<number>(60)
  const [isRecurring, setIsRecurring] = useState<boolean>(false)

  // Contact Details Form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [formErrors, setFormErrors] = useState<string[]>([])

  const contactStepRef = useRef<HTMLDivElement>(null)

  const nameId = useId()
  const emailId = useId()
  const phoneId = useId()
  const eventDescId = useId()

  const quote = calculateHireQuote({
    roomId,
    date,
    startTime,
    durationHours,
    kitchenId,
    equipmentIds,
    guestCount
  })

  const toggleEquipment = (eqId: EquipmentId) => {
    setEquipmentIds(prev => 
      prev.includes(eqId) ? prev.filter(id => id !== eqId) : [...prev, eqId]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors: string[] = []
    if (!name.trim()) errors.push('Please enter your full name')
    if (!email.trim() || !email.includes('@')) errors.push('Please enter a valid email address')
    if (!phone.trim()) errors.push('Please enter a contact telephone number')
    if (!eventDescription.trim()) errors.push('Please provide a brief description of your event')

    if (errors.length > 0) {
      setFormErrors(errors)
      return
    }

    setFormErrors([])
    setSubmitted(true)
  }

  const contactPayload = {
    name,
    email,
    phone,
    eventDescription: isRecurring ? `${eventDescription} (Recurring Booking Requested)` : eventDescription,
    date,
    startTime
  }

  const mailtoUri = generateInquiryMailto(quote, contactPayload)
  const plainTextSummary = formatInquiryPlainText(quote, contactPayload)

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(plainTextSummary)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      // Fallback textarea copy if clipboard permission is restricted
      const textArea = document.createElement('textarea')
      textArea.value = plainTextSummary
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  const scrollToContactStep = () => {
    contactStepRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="max-w-5xl mx-auto my-6 sm:my-8 p-5 sm:p-10 bg-brand-surface rounded-2xl shadow-elevated border border-brand-forest/10">
      {/* Header Banner */}
      <div className="border-b border-brand-cream-dark pb-5 sm:pb-6 mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-brass/15 text-brand-forest-dark text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-brand-brass" /> Transparent Venue Pricing
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest-dark">
          Interactive Room Hire &amp; Inquiry Estimator
        </h2>
        <p className="text-xs sm:text-sm text-brand-text-muted mt-1 leading-relaxed">
          Select your desired room, date, and catering needs to calculate instant hire estimates and send a pre-filled booking inquiry directly to Tracy Ely, KEH Booking Administrator.
        </p>
      </div>

      {submitted ? (
        <div className="p-6 sm:p-12 text-center bg-brand-cream rounded-2xl border border-brand-brass/30 animate-in zoom-in-95 duration-200">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-brand-forest-dark mb-2">
            Inquiry Prepared for Dispatch!
          </h3>
          <p className="text-xs sm:text-sm text-brand-text-muted max-w-lg mx-auto mb-6 leading-relaxed">
            Thank you, <strong className="text-brand-forest">{name}</strong>. Your provisional booking inquiry for <strong>{quote.roomName}</strong> on <strong>{date}</strong> ({quote.durationHours} hours, est. £{quote.estimatedTotal}) has been prepared.
          </p>

          <div className="bg-brand-surface p-4 sm:p-5 rounded-xl text-left text-xs max-w-md mx-auto space-y-1.5 border border-brand-forest/10 mb-6 font-mono text-brand-text-dark">
            <div className="font-bold font-sans text-brand-forest mb-2">Booking Summary:</div>
            <div>• Room: {quote.roomName}</div>
            <div>• Date: {date} ({quote.isPeakRate ? 'Peak Weekend / Evening' : 'Standard Weekday'})</div>
            <div>• Time: {startTime} ({durationHours} hours)</div>
            <div>• Kitchen: {quote.kitchenName} (£{quote.kitchenCost})</div>
            {quote.equipmentNames.length > 0 && (
              <div>• Equipment: {quote.equipmentNames.join(', ')} (£{quote.equipmentCost})</div>
            )}
            {isRecurring && <div>• Frequency: Recurring Series Requested</div>}
            <div>• Attendees: {guestCount} guests</div>
            <div>• Estimated Total: £{quote.estimatedTotal}</div>
            <div>• Recipient: roomhire@kingedwardhall.org.uk</div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 max-w-md mx-auto">
            <a 
              href={mailtoUri}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-brand-forest text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold hover:bg-brand-forest-light transition-colors shadow-soft"
            >
              <Send className="w-4 h-4" /> Open in Email Client
            </a>
            <button
              type="button"
              onClick={handleCopySummary}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-brand-surface border border-brand-forest/20 hover:border-brand-brass text-brand-forest-dark px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-brand-brass" />
                  <span>Copy Inquiry to Clipboard</span>
                </>
              )}
            </button>
          </div>

          <button 
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-5 text-xs font-semibold text-brand-text-muted hover:text-brand-forest underline block mx-auto py-2"
          >
            Adjust Inquiry Details
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 pb-16 sm:pb-0">
          {/* Step 1: Room Selection Cards */}
          <div>
            <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-forest mb-3">
              Step 1: Choose Your Room or Hall
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
              {(Object.keys(ROOM_RATES) as RoomId[]).map((rId) => {
                const r = ROOM_RATES[rId]
                const isSelected = roomId === rId
                return (
                  <button
                    key={rId}
                    type="button"
                    onClick={() => setRoomId(rId)}
                    className={`text-left p-4 sm:p-5 rounded-xl border-2 transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-brand-forest bg-brand-forest/5 shadow-soft ring-2 ring-brand-forest/15'
                        : 'border-brand-cream-dark bg-brand-surface hover:border-brand-brass/50'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="font-serif text-lg font-bold text-brand-forest-dark">{r.name}</span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-brass/15 text-brand-forest-dark shrink-0">
                          {r.maxCapacity} max
                        </span>
                      </div>
                      <p className="text-xs text-brand-text-muted line-clamp-3 mb-4 leading-relaxed">
                        {r.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-brand-cream-dark text-xs flex justify-between items-center">
                      <span className="text-brand-forest font-semibold">Weekday: £{r.weekdayRate}/hr</span>
                      <span className="text-brand-brass font-bold">Weekend: £{r.weekendRate}/hr</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 2: Date, Time, Duration & Guests (with Touch Steppers) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-brand-cream/60 p-4 sm:p-5 rounded-xl border border-brand-cream-dark">
            <div>
              <label className="block text-xs font-bold text-brand-forest mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-brass" /> Event Date
              </label>
              <input 
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full min-h-[44px] text-sm bg-white border border-brand-forest/20 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-brass"
                required
              />
              <span className="text-[11px] text-brand-text-muted flex items-center gap-1 mt-1.5 font-medium">
                {quote.isPeakRate ? (
                  <>
                    <Sparkles className="w-3 h-3 text-brand-brass shrink-0" />
                    <span>Peak Rate (Weekend / Fri Eve)</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-3 h-3 text-brand-forest shrink-0" />
                    <span>Standard Off-Peak Weekday</span>
                  </>
                )}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-forest mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-brass" /> Start Time
              </label>
              <input 
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full min-h-[44px] text-sm bg-white border border-brand-forest/20 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-brass"
                required
              />
            </div>

            {/* Duration with touch +/- steppers */}
            <div>
              <label className="block text-xs font-bold text-brand-forest mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-brass" /> Duration (Hours)
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setDurationHours((h) => Math.max(1, h - 1))}
                  className="min-w-[42px] min-h-[44px] rounded-xl bg-white border border-brand-forest/20 hover:border-brand-brass flex items-center justify-center text-brand-forest-dark active:scale-95 transition-all"
                  aria-label="Decrease duration by 1 hour"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <select
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value))}
                  aria-label="Duration (Hours)"
                  className="w-full min-h-[44px] text-sm font-semibold text-center bg-white border border-brand-forest/20 rounded-xl px-2 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-brass"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => (
                    <option key={h} value={h}>{h} {h === 1 ? 'Hour' : 'Hours'}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setDurationHours((h) => Math.min(12, h + 1))}
                  className="min-w-[42px] min-h-[44px] rounded-xl bg-white border border-brand-forest/20 hover:border-brand-brass flex items-center justify-center text-brand-forest-dark active:scale-95 transition-all"
                  aria-label="Increase duration by 1 hour"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Expected Guests with touch +/- steppers */}
            <div>
              <label className="block text-xs font-bold text-brand-forest mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-brand-brass" /> Expected Guests
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setGuestCount((g) => Math.max(5, g - 10))}
                  className="min-w-[42px] min-h-[44px] rounded-xl bg-white border border-brand-forest/20 hover:border-brand-brass flex items-center justify-center text-brand-forest-dark active:scale-95 transition-all"
                  aria-label="Decrease expected guests by 10"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input 
                  type="number"
                  value={guestCount}
                  min={1}
                  max={250}
                  aria-label="Expected Guests"
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full min-h-[44px] text-sm font-semibold text-center bg-white border border-brand-forest/20 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-brass"
                  required
                />
                <button
                  type="button"
                  onClick={() => setGuestCount((g) => Math.min(250, g + 10))}
                  className="min-w-[42px] min-h-[44px] rounded-xl bg-white border border-brand-forest/20 hover:border-brand-brass flex items-center justify-center text-brand-forest-dark active:scale-95 transition-all"
                  aria-label="Increase expected guests by 10"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Recurring booking option */}
          <div className="p-3.5 bg-brand-cream/40 rounded-xl border border-brand-cream-dark flex items-center gap-3">
            <input 
              type="checkbox"
              id="recurringCheck"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="w-4 h-4 rounded text-brand-brass focus:ring-brand-brass"
            />
            <label htmlFor="recurringCheck" className="text-xs text-brand-text-dark cursor-pointer flex items-center gap-1.5">
              <Repeat className="w-3.5 h-3.5 text-brand-brass shrink-0" />
              <span><strong>Recurring Booking:</strong> This is a weekly or monthly class/meeting request.</span>
            </label>
          </div>

          {/* Capacity warning alert if exceeded */}
          {quote.capacityWarning && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{quote.capacityWarning} Please consider hiring a larger hall or reducing attendance.</span>
            </div>
          )}

          {/* Step 2: Kitchen Catering Add-on */}
          <div>
            <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-forest mb-3 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-brand-brass" /> Step 2: Catering &amp; Kitchen Access
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(Object.keys(KITCHEN_RATES) as KitchenId[]).map((kId) => {
                const k = KITCHEN_RATES[kId]
                const isSelected = kitchenId === kId
                return (
                  <button
                    key={kId}
                    type="button"
                    onClick={() => setKitchenId(kId)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-brand-brass bg-brand-brass/10 ring-1 ring-brand-brass'
                        : 'border-brand-cream-dark bg-brand-surface hover:border-brand-brass/40'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-sm text-brand-forest-dark">{k.name}</span>
                      <span className="text-xs font-bold text-brand-forest">{k.flatRate === 0 ? 'Free' : `+£${k.flatRate}`}</span>
                    </div>
                    <p className="text-xs text-brand-text-muted">{k.description}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 3: Equipment Add-ons */}
          <div>
            <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-forest mb-3 flex items-center gap-2">
              <Mic className="w-4 h-4 text-brand-brass" /> Step 3: Audio-Visual &amp; Equipment Add-ons (Optional)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(Object.keys(EQUIPMENT_RATES) as EquipmentId[]).map((eqId) => {
                const eq = EQUIPMENT_RATES[eqId]
                const isSelected = equipmentIds.includes(eqId)
                return (
                  <button
                    key={eqId}
                    type="button"
                    onClick={() => toggleEquipment(eqId)}
                    className={`text-left p-4 rounded-xl border transition-all flex justify-between items-start ${
                      isSelected
                        ? 'border-brand-forest bg-brand-forest/5 ring-1 ring-brand-forest'
                        : 'border-brand-cream-dark bg-brand-surface hover:border-brand-brass/40'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-sm text-brand-forest-dark block">{eq.name}</span>
                      <span className="text-xs text-brand-text-muted">{eq.description}</span>
                    </div>
                    <span className="text-xs font-bold text-brand-forest shrink-0 ml-3">+£{eq.flatRate}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Live Quote Breakdown Card */}
          <div className="bg-brand-forest text-brand-cream p-5 sm:p-6 rounded-2xl shadow-soft border border-brand-brass/30">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-forest-light pb-4 mb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-brand-brass-light font-bold">Estimated Cost Breakdown</span>
                <h3 className="font-serif text-xl font-bold text-white mt-0.5">{quote.roomName}</h3>
                <span className="text-xs text-brand-cream/80">{quote.durationHours} hours @ £{quote.hourlyRate}/hr ({quote.isPeakRate ? 'Peak Weekend / Evening' : 'Standard Weekday'})</span>
              </div>
              <div className="sm:text-right">
                <span className="text-xs text-brand-cream/70 block">Estimated Hire Fee</span>
                <span className="font-serif text-3xl font-bold text-brand-brass-light">£{quote.estimatedTotal}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-brand-cream/80">
              <div>• Base Room Fee: <strong className="text-white">£{quote.totalRoomCost}</strong></div>
              <div>• Kitchen Fee: <strong className="text-white">£{quote.kitchenCost}</strong></div>
              <div>• Equipment Fee: <strong className="text-white">£{quote.equipmentCost}</strong></div>
              <div>• Tables &amp; Setup: <strong className="text-emerald-300">Included</strong></div>
            </div>
          </div>

          {/* Step 4: Contact Details & Submit */}
          <div ref={contactStepRef} id="calculator-contact-step" className="border-t border-brand-cream-dark pt-6 scroll-mt-24">
            <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-forest mb-4">
              Step 4: Your Contact Details &amp; Event Details
            </label>

            {formErrors.length > 0 && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs space-y-1">
                {formErrors.map((err, i) => (
                  <div key={i}>• {err}</div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor={nameId} className="block text-xs font-semibold text-brand-text-dark mb-1">Your Full Name *</label>
                <input 
                  id={nameId}
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full min-h-[44px] text-sm border border-brand-forest/20 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-brass"
                  required
                />
              </div>
              <div>
                <label htmlFor={emailId} className="block text-xs font-semibold text-brand-text-dark mb-1">Email Address *</label>
                <input 
                  id={emailId}
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="s.jenkins@example.co.uk"
                  className="w-full min-h-[44px] text-sm border border-brand-forest/20 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-brass"
                  required
                />
              </div>
              <div>
                <label htmlFor={phoneId} className="block text-xs font-semibold text-brand-text-dark mb-1">Contact Telephone *</label>
                <input 
                  id={phoneId}
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="07700 900123"
                  className="w-full min-h-[44px] text-sm border border-brand-forest/20 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-brass"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor={eventDescId} className="block text-xs font-semibold text-brand-text-dark mb-1">Nature of Event &amp; Special Requirements *</label>
              <textarea 
                id={eventDescId}
                rows={3}
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="e.g. 50th Birthday Party with buffet catering and acoustic duo. Need access 1 hour prior for setup."
                className="w-full text-sm border border-brand-forest/20 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-brass"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-brand-text-muted">
                <Info className="w-4 h-4 text-brand-brass shrink-0" />
                <span>No payment required now. Tracy Ely will review availability and confirm your booking.</span>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 bg-brand-brass hover:bg-brand-brass-hover text-white px-8 py-3 rounded-xl text-sm font-bold shadow-soft transition-all active:scale-[0.98]"
              >
                <Send className="w-4 h-4" />
                <span>Submit Provisional Inquiry</span>
              </button>
            </div>
          </div>

          {/* Sticky Mobile Bottom Live-Quote Bar */}
          {showMobileStickyBar && (
            <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-brand-forest text-white border-t border-brand-brass/40 px-4 py-3 shadow-elevated flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-brand-brass-light font-bold block">
                  {quote.roomName} • {quote.durationHours}h
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-xl font-bold text-white">£{quote.estimatedTotal}</span>
                  <span className="text-[11px] text-brand-cream/75">
                    ({quote.isPeakRate ? 'Peak' : 'Weekday'})
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={scrollToContactStep}
                className="min-h-[42px] bg-brand-brass hover:bg-brand-brass-hover text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-soft active:scale-95 transition-transform"
              >
                <span>Review &amp; Send</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  )
}
