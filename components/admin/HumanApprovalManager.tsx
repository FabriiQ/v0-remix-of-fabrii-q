'use client';

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

let socket: Socket;

export default function HumanApprovalManager() {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const socketInitializer = async () => {
      // We connect to the socket.io server that is running on the same host
      socket = io();

      socket.on('connect', () => {
        console.log('Connected to Socket.IO server');
        setIsConnected(true);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from Socket.IO server');
        setIsConnected(false);
      });

      socket.on('new_approval_request', (data) => {
        console.log('New approval request received:', data);
        toast({
          title: 'New Approval Request',
          description: data.explanation || 'A new action requires your approval.',
        });
      });
    };

    socketInitializer();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [toast]);

  const joinReviewersChannel = () => {
    if (socket) {
      socket.emit('join_reviewers_channel');
      setIsJoined(true);
      toast({
        title: 'Channel Joined',
        description: 'You will now receive notifications for new approval requests.',
      });
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isConnected && !isJoined && (
        <Button onClick={joinReviewersChannel}>
          Receive Approval Notifications
        </Button>
      )}
    </div>
  );
}