import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Copy, Share2, Calendar, Clock, Car, Users, CheckCircle, MessageCircle } from 'lucide-react-native';
import useRides from '../hooks/useRides';

const DriverDashboard = () => {
  const { rides, loading, createRide } = useRides(1); // Mock user ID
  const [driverId] = useState('DRV-2024-8F3A');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'schedule' | 'groups'>('schedule');

  const upcomingRides = [
    {
      id: 1,
      passenger: "Maria Silva",
      date: "2025-01-15",
      time: "14:00",
      from: "Centro",
      to: "Shopping",
      status: "confirmado"
    },
    {
      id: 2,
      passenger: "João Costa",
      date: "2025-01-16",
      time: "09:00",
      from: "Aeroporto",
      to: "Hotel",
      status: "pendente"
    }
  ];

  const todaySchedule = [
    { time: "08:00", status: "livre" },
    { time: "09:00", status: "livre" },
    { time: "10:00", status: "livre" },
    { time: "11:00", status: "livre" },
    { time: "12:00", status: "livre" },
    { time: "13:00", status: "bloqueado" },
    { time: "14:00", status: "agendado", passenger: "Maria Silva" },
    { time: "15:00", status: "bloqueado" },
    { time: "16:00", status: "livre" },
    { time: "17:00", status: "livre" },
    { time: "18:00", status: "livre" },
  ];

  const copyDriverId = () => {
    navigator.clipboard.writeText(driverId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareDriverId = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Meu ID RideConnect',
        text: `Use meu ID para agendar corridas: ${driverId}`,
        url: window.location.origin
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTitleContainer}>
            <View style={styles.whatsappGradient}>
              <Car width={20} height={20} color="white" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Dashboard Motorista</Text>
              <Text style={styles.headerSubtitle}>João Silva</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => setActiveTab('schedule')}
            style={[styles.tab, activeTab === 'schedule' && styles.activeTab]}
          >
            <Calendar width={16} height={16} style={styles.tabIcon} color={activeTab === 'schedule' ? '#fff' : '#4b5563'} />
            <Text style={[styles.tabText, activeTab === 'schedule' && styles.activeTabText]}>
              Agenda
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('groups')}
            style={[styles.tab, activeTab === 'groups' && styles.activeTab]}
          >
            <Users width={16} height={16} style={styles.tabIcon} color={activeTab === 'groups' ? '#fff' : '#4b5563'} />
            <Text style={[styles.tabText, activeTab === 'groups' && styles.activeTabText]}>
              Grupos
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === 'schedule' && (
          <>
            {/* Driver ID Card */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardTitleContainer}>
                  <Users width={20} height={20} color="#25D366" style={styles.cardIcon} />
                  <Text style={styles.cardTitle}>Seu ID de Motorista</Text>
                </View>
              </View>
              <View style={styles.cardContent}>
                <View style={styles.driverIdContainer}>
                  <Text style={styles.driverIdText}>{driverId}</Text>
                  <Text style={styles.driverIdSubtitle}>
                    Compartilhe este ID com seus contatos para que possam agendar corridas
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={copyDriverId}
                    style={[styles.button, styles.outlineButton]}
                  >
                    {copied ? (
                      <CheckCircle width={16} height={16} color="#25D366" style={styles.buttonIcon} />
                    ) : (
                      <Copy width={16} height={16} color="#25D366" style={styles.buttonIcon} />
                    )}
                    <Text style={[styles.buttonText, styles.outlineButtonText]}>
                      {copied ? 'Copiado!' : 'Copiar'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={shareDriverId}
                    style={[styles.button, styles.whatsappButton]}
                  >
                    <Share2 width={16} height={16} color="white" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Compartilhar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Today's Schedule */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardTitleContainer}>
                  <Clock width={20} height={20} color="#25D366" style={styles.cardIcon} />
                  <Text style={styles.cardTitle}>Agenda de Hoje</Text>
                </View>
              </View>
              <View style={styles.cardContent}>
                {todaySchedule.map((slot) => (
                  <View key={slot.time} style={[styles.scheduleSlot,
                    slot.status === 'agendado' ? styles.scheduledSlot :
                      slot.status === 'bloqueado' ? styles.blockedSlot :
                        styles.freeSlot]}>
                    <View style={styles.slotInfo}>
                      <Text style={styles.slotTime}>{slot.time}</Text>
                      <View style={[styles.statusIndicator,
                        slot.status === 'agendado' ? styles.scheduledStatus :
                          slot.status === 'bloqueado' ? styles.blockedStatus :
                            styles.freeStatus]} />
                    </View>
                    <View style={styles.slotDetails}>
                      {slot.status === 'agendado' && (
                        <Text style={styles.scheduledPassenger}>{slot.passenger}</Text>
                      )}
                      {slot.status === 'bloqueado' && (
                        <Text style={styles.blockedText}>Bloqueado</Text>
                      )}
                      {slot.status === 'livre' && (
                        <Text style={styles.freeText}>Disponível</Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Upcoming Rides */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardTitleContainer}>
                  <Calendar width={20} height={20} color="#25D366" style={styles.cardIcon} />
                  <Text style={styles.cardTitle}>Próximas Corridas</Text>
                </View>
              </View>
              <View style={styles.cardContent}>
                {upcomingRides.map((ride) => (
                  <View key={ride.id} style={styles.rideItem}>
                    <View style={styles.rideHeader}>
                      <Text style={styles.ridePassenger}>{ride.passenger}</Text>
                      <View style={styles.rideActions}>
                        <Text style={[styles.rideStatus,
                          ride.status === 'confirmado' ? styles.confirmedStatus : styles.pendingStatus]}>
                          {ride.status}
                        </Text>
                        <TouchableOpacity style={styles.messageButton}>
                          <MessageCircle width={16} height={16} color="#25D366" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.rideDetails}>
                      <Text style={styles.rideDetailText}>
                        📅 {new Date(ride.date).toLocaleDateString('pt-BR')} às {ride.time}
                      </Text>
                      <Text style={styles.rideDetailText}>
                        📍 {ride.from} → {ride.to}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {activeTab === 'groups' && <Text>Groups Content Here</Text>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
  },
  headerContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whatsappGradient: {
    backgroundColor: '#25D366',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#4b5563',
  },
  tabContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    padding: 4,
    borderRadius: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  activeTab: {
    backgroundColor: '#25D366',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  tabIcon: {
    marginRight: 6,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  cardHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  cardContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  driverIdContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  driverIdText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#25D366',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  driverIdSubtitle: {
    fontSize: 12,
    color: '#4b5563',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#25D366',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  outlineButtonText: {
    color: '#25D366',
  },
  scheduleSlot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  scheduledSlot: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
  blockedSlot: {
    backgroundColor: '#fee2e2',
    borderColor: '#fecaca',
  },
  freeSlot: {
    backgroundColor: '#f9fafb',
    borderColor: '#e5e7eb',
  },
  slotInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slotTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    width: 48,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 12,
  },
  scheduledStatus: {
    backgroundColor: '#25D366',
  },
  blockedStatus: {
    backgroundColor: '#ef4444',
  },
  freeStatus: {
    backgroundColor: '#9ca3af',
  },
  slotDetails: {
    alignItems: 'flex-end',
  },
  scheduledPassenger: {
    fontSize: 14,
    fontWeight: '500',
    color: '#25D366',
  },
  blockedText: {
    fontSize: 14,
    color: '#ef4444',
  },
  freeText: {
    fontSize: 14,
    color: '#4b5563',
  },
  rideItem: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ridePassenger: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  rideActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rideStatus: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
    marginRight: 8,
  },
  confirmedStatus: {
    backgroundColor: '#ecfdf5',
    color: '#065f46',
  },
  pendingStatus: {
    backgroundColor: '#fffbeb',
    color: '#a16207',
  },
  messageButton: {
    padding: 6,
    borderRadius: 9999,
  },
  rideDetails: {
    marginTop: 4,
  },
  rideDetailText: {
    fontSize: 14,
    color: '#4b5563',
  },
});

export default DriverDashboard;
