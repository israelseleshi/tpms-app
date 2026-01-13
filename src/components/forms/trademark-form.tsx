"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { trademarkSchema, TrademarkFormData } from "./trademark-schema";
import { JurisdictionBadge } from "@/components/shared/jurisdiction-badge";

const niceClasses = Array.from({ length: 45 }, (_, i) => (i + 1).toString());

interface TrademarkFormProps {
  onSubmit: (data: TrademarkFormData) => void;
  defaultValues?: Partial<TrademarkFormData>;
  isLoading?: boolean;
}

export function TrademarkForm({ onSubmit, defaultValues, isLoading }: TrademarkFormProps) {
  const [selectedClasses, setSelectedClasses] = useState<string[]>(
    defaultValues?.classes || []
  );

  const form = useForm<TrademarkFormData>({
    resolver: zodResolver(trademarkSchema),
    defaultValues: {
      markName: "",
      description: "",
      jurisdiction: "ET" as const,
      classes: [],
      status: "filing" as const,
      clientName: "",
      clientEmail: "",
      notes: "",
      tags: [],
      ...defaultValues,
    },
  });

  const handleFormSubmit = (data: TrademarkFormData) => {
    onSubmit({ ...data, classes: selectedClasses });
  };

  const handleClassChange = (classValue: string, checked: boolean) => {
    if (checked) {
      setSelectedClasses([...selectedClasses, classValue]);
    } else {
      setSelectedClasses(selectedClasses.filter(c => c !== classValue));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="markName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mark Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter trademark name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jurisdiction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jurisdiction</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select jurisdiction" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ET">
                      <div className="flex items-center gap-2">
                        <JurisdictionBadge jurisdiction="ET" />
                        <span>Ethiopia</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="US">
                      <div className="flex items-center gap-2">
                        <JurisdictionBadge jurisdiction="US" />
                        <span>United States</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="EU">
                      <div className="flex items-center gap-2">
                        <JurisdictionBadge jurisdiction="EU" />
                        <span>European Union</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="UK">
                      <div className="flex items-center gap-2">
                        <JurisdictionBadge jurisdiction="UK" />
                        <span>United Kingdom</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the goods and services" 
                  className="min-h-25"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                  <Input placeholder="Client name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clientEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="client@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="classes"
          render={() => (
            <FormItem>
              <FormLabel>Nice Classes</FormLabel>
              <div className="grid grid-cols-5 gap-2 max-h-40 overflow-y-auto p-2 border rounded-md">
                {niceClasses.map((classNum) => (
                  <div key={classNum} className="flex items-center space-x-2">
                    <Checkbox
                      id={`class-${classNum}`}
                      checked={selectedClasses.includes(classNum)}
                      onCheckedChange={(checked) => 
                        handleClassChange(classNum, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`class-${classNum}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {classNum}
                    </Label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Additional notes or instructions" 
                  className="min-h-20"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : defaultValues?.id ? "Update Trademark" : "Create Trademark"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
