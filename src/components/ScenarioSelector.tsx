
import React from "react";
import { useChat } from "@/contexts/ChatContext";
import { roleplayScenarios } from "@/data/sampleMessages";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const ScenarioSelector: React.FC = () => {
  const { selectScenario } = useChat();

  // Arabic scenario titles and descriptions
  const arabicScenarios = [
    {
      id: "1",
      title: "مقهى منتصف الليل",
      description: "نلتقي في مقهى هادئ في وقت متأخر من الليل. الأجواء حميمية مع موسيقى الجاز الناعمة في الخلفية."
    },
    {
      id: "2",
      title: "مغامرة مشاهدة النجوم",
      description: "نذهب في رحلة عفوية لمشاهدة زخات النيازك من تلة معزولة."
    },
    {
      id: "3",
      title: "لقاء غامض",
      description: "نلتقي في حفل تنكري، كلانا يخفي أسراراً خلف أقنعتنا."
    },
    {
      id: "4",
      title: "يوم ممطر دافئ",
      description: "نحن محاصرون في الداخل خلال عاصفة رعدية، مع ضوء الشموع ورفقة بعضنا البعض فقط."
    },
    {
      id: "5",
      title: "عالم الخيال",
      description: "نحن مسافران من ممالك مختلفة نلتقي عند حافة غابة ساحرة."
    }
  ];

  return (
    <div className="p-4 animate-fade-in" dir="rtl">
      <div className="mb-4 text-center">
        <Sparkles className="h-8 w-8 mx-auto mb-2 text-secondary" />
        <h2 className="text-xl font-semibold mb-1">اختر سيناريو لعب الأدوار</h2>
        <p className="text-sm text-muted-foreground">
          حدد سيناريو لبدء لعب الأدوار مع أليكس
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-3 mt-4">
        {arabicScenarios.map((scenario) => {
          // Find the original scenario to pass to the select function
          const originalScenario = roleplayScenarios.find(s => s.id === scenario.id);
          
          return (
            <Card 
              key={scenario.id}
              className="cursor-pointer bg-card hover:bg-card/80 transition-colors duration-200 border-border/50"
              onClick={() => selectScenario(originalScenario || null)}
            >
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">{scenario.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
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
