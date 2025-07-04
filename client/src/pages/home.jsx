import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ServiceSelection from "@/components/booking/ServiceSelection";
import AddressInput from "@/components/booking/AddressInput";
import TimeSlotSelection from "@/components/booking/TimeSlotSelection";
import PaymentStep from "@/components/booking/PaymentStep";
import OrderConfirmation from "@/components/booking/OrderConfirmation";
import PricingSummary from "@/components/PricingSummary";
import Footer from "@/components/Footer";
import { useBookingState } from "@/hooks/useBookingState";
import { useAuth, useLogout } from "@/hooks/useAuth";
import { Clock, Shield, Truck, Calculator, User, LogOut, Settings, LayoutDashboard, ShieldCheck } from "lucide-react";
export default function Home() {
    var _a = useState(false), showBooking = _a[0], setShowBooking = _a[1];
    var _b = useBookingState(), currentStep = _b.currentStep, setCurrentStep = _b.setCurrentStep, bookingData = _b.bookingData, resetBooking = _b.resetBooking;
    var _c = useAuth(), user = _c.user, isAuthenticated = _c.isAuthenticated;
    var logoutMutation = useLogout();
    var _d = useLocation(), navigate = _d[1];
    var handleStartBooking = function () {
        setShowBooking(true);
        setCurrentStep(1);
    };
    var handleCloseBooking = function () {
        setShowBooking(false);
        resetBooking();
    };
    var renderStepContent = function () {
        switch (currentStep) {
            case 1:
                return <ServiceSelection />;
            case 2:
                return <AddressInput />;
            case 3:
                return <TimeSlotSelection />;
            case 4:
                return <PaymentStep />;
            case 5:
                return <OrderConfirmation onNewOrder={handleCloseBooking}/>;
            default:
                return <ServiceSelection />;
        }
    };
    var getStepTitle = function () {
        switch (currentStep) {
            case 1: return "Sélectionnez votre service";
            case 2: return "Adresse de livraison";
            case 3: return "Choisissez votre créneau";
            case 4: return "Paiement sécurisé";
            case 5: return "Commande confirmée";
            default: return "Réservation";
        }
    };
    if (currentStep === 5) {
        return <OrderConfirmation onNewOrder={handleCloseBooking}/>;
    }
    if (showBooking) {
        return (<div className="min-h-screen bg-slate-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-primary-600">
                  <i className="fas fa-dumpster mr-2"></i>BennesPro
                </span>
              </div>
              <Button variant="ghost" onClick={handleCloseBooking}>
                ✕
              </Button>
            </div>
          </div>
        </nav>

        {/* Progress Steps */}
        <div className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-slate-900">{getStepTitle()}</h1>
            </div>
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map(function (step) { return (<div key={step} className="flex items-center">
                  <div className={"w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ".concat(step <= currentStep
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-200 text-slate-600')}>
                    {step}
                  </div>
                  <span className={"ml-2 text-sm font-medium hidden sm:inline ".concat(step <= currentStep ? 'text-primary-600' : 'text-slate-400')}>
                    {step === 1 && 'Service'}
                    {step === 2 && 'Adresse'}
                    {step === 3 && 'Créneau'}
                    {step === 4 && 'Paiement'}
                  </span>
                  {step < 4 && <div className="flex-1 h-px bg-slate-200 mx-4"></div>}
                </div>); })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {renderStepContent()}
            </div>
            <div className="lg:col-span-1">
              <PricingSummary />
            </div>
          </div>
        </div>
      </div>);
    }
    return (<div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/32/Remondis_logo.svg" alt="Remondis" className="h-8 w-auto"/>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (<>
                  {/* Price Simulation Button */}
                  <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50" onClick={function () { return navigate("/price-simulation"); }}>
                    <Calculator className="h-4 w-4 mr-2"/>
                    Simulation Prix
                  </Button>

                  {/* Admin Panel Button */}
                  {(user === null || user === void 0 ? void 0 : user.role) === 'admin' && (<Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50" onClick={function () { return navigate("/admin"); }}>
                      <ShieldCheck className="h-4 w-4 mr-2"/>
                      Panneau Admin
                    </Button>)}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                        <User className="h-4 w-4 mr-2"/>
                        {user === null || user === void 0 ? void 0 : user.firstName} {user === null || user === void 0 ? void 0 : user.lastName}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem onClick={function () { return navigate("/client-dashboard"); }}>
                        <LayoutDashboard className="h-4 w-4 mr-2"/>
                        Mon tableau de bord
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={function () { return navigate("/profile"); }}>
                        <Settings className="h-4 w-4 mr-2"/>
                        Mon profil
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={function () { return logoutMutation.mutate(); }} className="text-red-600">
                        <LogOut className="h-4 w-4 mr-2"/>
                        Déconnexion
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>) : (<Button variant="ghost" className="text-gray-600 hover:text-gray-900" onClick={function () { return navigate("/auth"); }}>
                  <User className="h-4 w-4 mr-1"/>
                  Connexion / Inscription
                </Button>)}
              
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Direct booking interface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calculez le prix de votre benne en temps réel
          </h1>
          <p className="text-xl text-gray-600">
            Choisissez votre benne, indiquez vos déchets et obtenez instantanément votre devis
          </p>
        </div>

        {/* Quick Booking Form */}
        <Card className="max-w-4xl mx-auto shadow-xl">
          <CardContent className="p-8">
            <ServiceSelection />
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Pourquoi choisir Remondis ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg border-red-100">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="text-red-600 h-6 w-6"/>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Service 24h/24</h3>
                <p className="text-gray-600">Réservation en ligne disponible à tout moment avec confirmation immédiate.</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-red-100">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="text-red-600 h-6 w-6"/>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Expertise environnementale</h3>
                <p className="text-gray-600">Leader européen de la gestion des déchets avec 40 ans d'expérience.</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-red-100">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="text-red-600 h-6 w-6"/>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Livraison garantie</h3>
                <p className="text-gray-600">Livraison et récupération ponctuelles dans toute la France.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>);
}
