'use client'
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Star, Link, Globe } from "lucide-react";

const BusinessProfile = ({ business }) => {
  console.log(business.images[0]);
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="flex flex-row items-center space-x-4 pb-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={business.logo} alt={business.name} />
            <AvatarFallback className='font-bold text-3xl text-gray-400'>{business.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl font-bold">{business.name}</CardTitle>
            <Badge variant="secondary" className="mt-1">{business.types[0]}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">{business.description}</p>
            
            <div className="flex items-center space-x-2">
              <MapPin className="text-gray-400" size={16} />
              <span>
                {business.address}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Phone className="text-gray-400" size={16} />
              <span>{business.phone}</span>
            </div>
            
            <div className="flex items-center space-x-2">
            <Globe  className="text-gray-400" size={16} />
            <a className='text-blue-600 hover:text-blue-500' href={business.website}>website</a>
            </div>
            
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-300 fill-current" size={16} />
              <span>{business?.rating?.toFixed(1) || 0} ({business?.reviewCount || 0} reviews)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessProfile;