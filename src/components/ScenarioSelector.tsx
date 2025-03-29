
import React from "react";
import { useChat } from "@/contexts/ChatContext";
import { roleplayScenarios } from "@/data/sampleMessages";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Theater } from "lucide-react";

const ScenarioSelector: React.FC = () => {
  const { selectScenario } = useChat();

  // Lebanese scenario titles and descriptions
  const arabicScenarios = [
    {
      id: "1",
      title: "كافيه نص الليل",
      description: "منلتقي بكافيه هادي متأخر بالليل. الجو رومانسي مع موسيقى جاز ناعمة بالخلفية."
    },
    {
      id: "2",
      title: "مغامرة تحت النجوم",
      description: "منروح رحلة ما خططنالها لنشوف زخات الشهب من تلة بعيدة."
    },
    {
      id: "3",
      title: "لقاء غامض",
      description: "منتلاقى بحفلة تنكرية، كل واحد منا مخبي أسرار ورا قناعو."
    },
    {
      id: "4",
      title: "يوم شتوي دافي",
      description: "نحنا محبوسين جوا البيت بسبب عاصفة، بس ضو الشموع ورفقتك بيكفوني."
    },
    {
      id: "5",
      title: "عالم خيالي",
      description: "نحنا مسافرين من ممالك مختلفة منلتقي عند حدود غابة سحرية."
    }
  ];

  return (
    <div className="p-3 sm:p-4 animate-fade-in" dir="rtl">
      <div className="mb-4 text-center">
        <div className="inline-flex items-center justify-center bg-card/60 p-3 mb-2 rounded-full">
          <Theater className="h-7 w-7 text-accent" />
        </div>
        <h2 className="text-xl font-semibold mb-1 font-playfair gradient-text">اختار سيناريو نلعب سوا</h2>
        <p className="text-sm text-muted-foreground">
          شو بتحب منعمل سوا يا حلو؟
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-3 mt-4">
        {arabicScenarios.map((scenario) => {
          // Find the original scenario to pass to the select function
          const originalScenario = roleplayScenarios.find(s => s.id === scenario.id);
          
          return (
            <Card 
              key={scenario.id}
              className="cursor-pointer card-gradient hover:bg-card/60 transition-colors duration-200 border-border/50 shadow-sm"
              onClick={() => selectScenario(originalScenario || null)}
            >
              <CardHeader className="p-3 pb-1 sm:p-4 sm:pb-2">
                <CardTitle className="text-base flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-secondary opacity-70" />
                  {scenario.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 sm:p-4 sm:pt-0">
                <CardDescription className="text-sm text-muted-foreground">
                  {scenario.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ScenarioSelector;
