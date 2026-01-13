"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Building2, Mail, Phone, MapPin, ChevronRight, Search } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { AnimatedWrapper } from "@/components/animations/AnimatedWrapper";
import { mockClients } from "@/lib/mock-data";
import { useSearch } from "@/context/SearchContext";

export default function ClientsPage() {
  const [showForm, setShowForm] = useState(false);
  const { searchQuery } = useSearch();
  const [formData, setFormData] = useState({
    clientName: "",
    contactPerson: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    notes: "",
  });

    const filteredClients = mockClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
    setFormData({
      clientName: "",
      contactPerson: "",
      email: "",
      phone: "",
      country: "",
      address: "",
      notes: "",
    });
    setShowForm(false);
  };

  return (
    <div className="p-4 md:p-6" style={{ minHeight: '100vh' }}>
      <AnimatedWrapper animation="fadeIn">
        <PageHeader 
          title="Clients & Owners"
          subtitle="Manage trademark owners and client relationships"
        />
      </AnimatedWrapper>

      {/* Add Client Form */}
      {showForm && (
        <Card className="glass-card smooth-corners">
          <CardHeader>
            <CardTitle>Add New Client</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    placeholder="Company or individual name"
                    value={formData.clientName}
                    onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    placeholder="Primary contact"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="Street address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes about client"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="apple-button apple-tint-bg text-white">
                  Create Client
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <AnimatedWrapper animation="scaleUp" delay={0.1}>
        {!showForm && (
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={() => setShowForm(true)}
              className="apple-button apple-tint-bg text-white gap-2 px-6 py-3"
            >
              <Plus className="h-4 w-4" />
              Add Client
            </Button>
          </div>
        )}

        <div className="mt-6 space-y-6">
          {/* Client Cards - Desktop View */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <Link href={`/dashboard/clients/${client.id}`} key={client.id}>
                <Card className="glass-card smooth-corners hover:shadow-lg transition-all h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center smooth-corners" style={{ backgroundColor: 'var(--apple-blue)' }}>
                          <Building2 className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="apple-text-lg">{client.name}</CardTitle>
                          <p className="apple-text-base text-slate-600">{client.contact}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="smooth-corners" style={{ backgroundColor: 'var(--apple-blue)', color: 'white' }}>
                        {client.trademarks} TM
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 apple-text-base text-slate-600">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 apple-text-base text-slate-600">
                      <Phone className="h-4 w-4" />
                      <span>{client.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 apple-text-base text-slate-600">
                      <MapPin className="h-4 w-4" />
                      <span>{client.country}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Client List - Mobile View */}
          <div className="md:hidden bg-white rounded-xl border border-slate-200/50 overflow-hidden">
            <div className="divide-y divide-slate-200/50">
              {filteredClients.map((client) => (
                <Link href={`/dashboard/clients/${client.id}`} key={client.id} className="flex items-center justify-between p-4 hover:bg-slate-50/50 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: 'var(--apple-blue)' }}>
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 apple-text-base">{client.name}</span>
                      <span className="text-slate-600 apple-text-sm">{`${client.contact} • ${client.country}`}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="smooth-corners" style={{ backgroundColor: 'var(--apple-blue)', color: 'white' }}>
                      {client.trademarks} TM
                    </Badge>
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  );
}
