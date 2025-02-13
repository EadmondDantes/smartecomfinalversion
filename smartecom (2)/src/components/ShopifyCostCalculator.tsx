import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, HelpCircle } from 'lucide-react';

interface CostBreakdown {
  monthlySubscription: number;
  yearlySubscription: number;
  transactionFees: number;
  developmentCost: number;
  integrationCosts: number;
  totalMonthly: number;
  totalYearly: number;
}

const EXCHANGE_RATE = 3.7; // USD to ILS
const SHOPIFY_PLANS = {
  basic: 39,
  shopify: 105,
  advanced: 399,
};

const TRANSACTION_FEES = {
  basic: 0.02,
  shopify: 0.0175,
  advanced: 0.015,
};

const INTEGRATION_COSTS = {
  erp: 15000, // ERP/CRM integration cost
  pos: 8500,  // POS integration cost
};

export default function ShopifyCostCalculator() {
  const [plan, setPlan] = useState<'basic' | 'shopify' | 'advanced'>('basic');
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(10000);
  const [needsDevelopment, setNeedsDevelopment] = useState<boolean>(false);
  const [developmentScope, setDevelopmentScope] = useState<'small' | 'medium' | 'large'>('small');
  const [needsErpIntegration, setNeedsErpIntegration] = useState<boolean>(false);
  const [needsPosIntegration, setNeedsPosIntegration] = useState<boolean>(false);
  const [showErpTooltip, setShowErpTooltip] = useState<boolean>(false);
  const [costs, setCosts] = useState<CostBreakdown>({
    monthlySubscription: 0,
    yearlySubscription: 0,
    transactionFees: 0,
    developmentCost: 0,
    integrationCosts: 0,
    totalMonthly: 0,
    totalYearly: 0,
  });

  const DEVELOPMENT_COSTS = {
    small: 5000,
    medium: 15000,
    large: 30000,
  };

  useEffect(() => {
    const monthlySubscription = SHOPIFY_PLANS[plan] * EXCHANGE_RATE;
    const yearlySubscription = monthlySubscription * 12;
    const transactionFees = monthlyRevenue * TRANSACTION_FEES[plan];
    const developmentCost = needsDevelopment ? DEVELOPMENT_COSTS[developmentScope] : 0;
    const integrationCosts = 
      (needsErpIntegration ? INTEGRATION_COSTS.erp : 0) +
      (needsPosIntegration ? INTEGRATION_COSTS.pos : 0);
    
    const totalMonthly = monthlySubscription + transactionFees;
    const totalYearly = yearlySubscription + (transactionFees * 12) + developmentCost + integrationCosts;

    setCosts({
      monthlySubscription,
      yearlySubscription,
      transactionFees,
      developmentCost,
      integrationCosts,
      totalMonthly,
      totalYearly,
    });
  }, [plan, monthlyRevenue, needsDevelopment, developmentScope, needsErpIntegration, needsPosIntegration]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">מחשבון עלויות Shopify</h2>
        <p className="text-gray-600">חשב את העלויות הצפויות להקמת והפעלת חנות Shopify</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              חבילת Shopify
            </label>
            <div className="grid grid-cols-3 gap-4">
              {(['basic', 'shopify', 'advanced'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlan(p)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${plan === p
                      ? 'bg-rose-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {p === 'basic' && 'Basic'}
                  {p === 'shopify' && 'Shopify'}
                  {p === 'advanced' && 'Advanced'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              הכנסה חודשית צפויה (₪)
            </label>
            <input
              type="number"
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="flex items-center space-x-3 space-x-reverse">
              <input
                type="checkbox"
                checked={needsDevelopment}
                onChange={(e) => setNeedsDevelopment(e.target.checked)}
                className="rounded border-gray-300 text-rose-500 focus:ring-rose-500"
              />
              <span className="text-sm font-medium text-gray-700">
                צריך פיתוח והתאמה אישית?
              </span>
            </label>
          </div>

          {needsDevelopment && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                היקף הפיתוח
              </label>
              <div className="grid grid-cols-3 gap-4">
                {(['small', 'medium', 'large'] as const).map((scope) => (
                  <button
                    key={scope}
                    onClick={() => setDevelopmentScope(scope)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                      ${developmentScope === scope
                        ? 'bg-rose-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {scope === 'small' && 'בסיסי'}
                    {scope === 'medium' && 'בינוני'}
                    {scope === 'large' && 'מורחב'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {plan === 'advanced' && (
            <div className="space-y-4">
              <div className="relative">
                <label className="flex items-center space-x-3 space-x-reverse">
                  <input
                    type="checkbox"
                    checked={needsErpIntegration}
                    onChange={(e) => setNeedsErpIntegration(e.target.checked)}
                    className="rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    אינטגרציה ל-ERP/CRM
                  </span>
                  <button
                    onMouseEnter={() => setShowErpTooltip(true)}
                    onMouseLeave={() => setShowErpTooltip(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </button>
                </label>
                {showErpTooltip && (
                  <div className="absolute z-10 right-0 mt-2 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg max-w-xs">
                    תמיכה במערכות Priority, Comax ועוד
                  </div>
                )}
              </div>

              <div>
                <label className="flex items-center space-x-3 space-x-reverse">
                  <input
                    type="checkbox"
                    checked={needsPosIntegration}
                    onChange={(e) => setNeedsPosIntegration(e.target.checked)}
                    className="rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    אינטגרציה ל-POS
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-rose-500" />
            פירוט עלויות
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">מנוי חודשי:</span>
              <span className="font-medium">₪{costs.monthlySubscription.toFixed(0)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">עמלות סליקה (חודשי):</span>
              <span className="font-medium">₪{costs.transactionFees.toFixed(0)}</span>
            </div>
            
            {needsDevelopment && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">עלות פיתוח (חד פעמי):</span>
                <span className="font-medium">₪{costs.developmentCost.toFixed(0)}</span>
              </div>
            )}

            {(needsErpIntegration || needsPosIntegration) && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">עלות אינטגרציות (חד פעמי):</span>
                <span className="font-medium">₪{costs.integrationCosts.toFixed(0)}</span>
              </div>
            )}
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-900 font-medium">סה"כ חודשי:</span>
                <span className="text-lg font-bold text-rose-500">
                  ₪{costs.totalMonthly.toFixed(0)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-medium">סה"כ שנתי:</span>
                <span className="text-lg font-bold text-rose-500">
                  ₪{costs.totalYearly.toFixed(0)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-rose-50 rounded-lg">
            <h4 className="text-sm font-medium text-rose-900 mb-2 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              כדאי לדעת
            </h4>
            <ul className="text-sm text-rose-700 space-y-1">
              <li>• המחירים כוללים מע"מ</li>
              <li>• עמלות הסליקה משתנות לפי חבילה</li>
              <li>• עלויות הפיתוח והאינטגרציה הן הערכה בלבד</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}