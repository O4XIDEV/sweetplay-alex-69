
import React from "react";
import { useChat } from "@/contexts/ChatContext";
import { roleplayScenarios } from "@/data/sampleMessages";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TheatreMask } from "lucide-react";

const ScenarioSelector: React.FC = () => {
  const { selectScenario } = useChat();

  return (
    <div className="p-4 animate-fade-in">
      <div className="mb-4 text-center">
        <TheatreMask className="h-8 w-8 mx-auto mb-2 text-secondary" />
        <h2 className="text-xl font-semibold mb-1">Choose a Roleplay Scenario</h2>
        <p className="text-sm text-muted-foreground">
          Select a scenario to start your roleplay with Alex
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-3 mt-4">
        {roleplayScenarios.map((scenario) => (
          <Card 
            key={scenario.id}
            className="cursor-pointer bg-card hover:bg-card/80 transition-colors duration-200 border-border/50"
            onClick={() => selectScenario(scenario)}
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
        ))}
      </div>
    </div>
  );
};

export default ScenarioSelector;
