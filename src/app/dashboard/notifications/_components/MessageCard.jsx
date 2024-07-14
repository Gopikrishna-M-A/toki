import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, MapPinIcon } from 'lucide-react';

const PartnershipRequestCard = ({ notification }) => {
  const { senderBusinessId, message, status, createdAt } = notification;
  const { name, logo, address } = senderBusinessId;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={logo} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <MapPinIcon className="w-4 h-4" />
            {address}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold mb-2">Partnership Request</h4>
          <p className="text-gray-700">{message}</p>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
        <Badge 
          variant={status === 'PENDING' ? 'outline' : status === 'ACCEPTED' ? 'success' : 'destructive'}
          className="text-xs"
        >
          {status}
        </Badge>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline">Decline</Button>
        <Button>Accept</Button>
      </CardFooter>
    </Card>
  );
};

export default PartnershipRequestCard;