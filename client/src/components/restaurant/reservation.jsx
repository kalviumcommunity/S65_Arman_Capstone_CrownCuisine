import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

const Reservation = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const timeSlots = [
    "11:00 AM", "11:30 AM", 
    "12:00 PM", "12:30 PM", 
    "1:00 PM", "1:30 PM", 
    "2:00 PM", "2:30 PM", 
    "5:00 PM", "5:30 PM", 
    "6:00 PM", "6:30 PM", 
    "7:00 PM", "7:30 PM", 
    "8:00 PM", "8:30 PM", 
    "9:00 PM"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the reservation data to your backend
    console.log({ date, time, guests, name, email, phone, specialRequests });
    setSubmitted(true);
  };

  const resetForm = () => {
    setDate(null);
    setTime("");
    setGuests("");
    setName("");
    setEmail("");
    setPhone("");
    setSpecialRequests("");
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div>
        <h2 className="text-3xl font-serif text-stone-800 mb-6 text-center">Table Reservations</h2>
        <Card className="bg-stone-200 rounded-md border-none shadow-none">
          <CardContent className="pt-6 pb-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-serif text-stone-800">Thank You!</h3>
              <p className="text-stone-600">
                Your reservation request has been submitted. We'll contact you shortly to confirm.
              </p>
              <div className="mt-6 space-y-2">
                <p className="font-medium">Reservation Details:</p>
                <p>{name}</p>
                <p>{format(date, "MMMM d, yyyy")} at {time}</p>
                <p>{guests} guests</p>
              </div>
              <Button 
                onClick={resetForm}
                className="mt-6 bg-stone-800 hover:bg-stone-900 rounded-md"
              >
                Make Another Reservation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-serif text-stone-800 mb-6 text-center">Table Reservations</h2>
      
      <Card className="bg-stone-200 rounded-md border-none shadow-none">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-stone-800">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="bg-white rounded-md border-none" 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-stone-800">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="bg-white rounded-md border-none" 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-stone-800">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className="bg-white rounded-md border-none" 
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-stone-800">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal bg-white rounded-md border-none ${!date && "text-stone-500"}`}
                      >
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white rounded-md" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <Label htmlFor="time" className="text-stone-800">Time</Label>
                  <Select value={time} onValueChange={setTime} required>
                    <SelectTrigger className="bg-white rounded-md border-none">
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-md">
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot} className="cursor-pointer">
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="guests" className="text-stone-800">Number of Guests</Label>
                  <Select value={guests} onValueChange={setGuests} required>
                    <SelectTrigger className="bg-white rounded-md border-none">
                      <SelectValue placeholder="Select guest count" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-md">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <SelectItem key={num} value={num.toString()} className="cursor-pointer">
                          {num} {num === 1 ? "guest" : "guests"}
                        </SelectItem>
                      ))}
                      <SelectItem value="9+" className="cursor-pointer">9+ guests (call for large parties)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="special-requests" className="text-stone-800">Special Requests</Label>
              <Textarea 
                id="special-requests"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="bg-white rounded-md border-none resize-none h-24"
                placeholder="Dietary restrictions, celebration details, seating preferences, etc."
              />
            </div>
            
            <div className="text-center">
              <Button 
                type="submit" 
                className="bg-stone-800 hover:bg-stone-900 rounded-md px-8 py-2 text-white"
                disabled={!date || !time || !guests || !name || !email || !phone}
              >
                Reserve Table
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reservation;
