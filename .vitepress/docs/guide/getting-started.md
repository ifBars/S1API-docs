# Getting Started with S1API

This guide will help you get up and running with S1API for your Schedule One modding project.

## Prerequisites

Before starting with S1API, make sure you have:

- A development environment set up for .NET programming
- Basic knowledge of C# programming
- Visual Studio or another IDE that supports .NET development
- Either the Mono or Il2Cpp version of Schedule One

## Project Setup

First, you'll need to add S1API as a reference to your mod project:

1. Download the latest version of S1API from the [releases page](https://github.com/KaBooMa/S1API/releases)
2. Add the S1API.dll as a reference in your mod project
3. Make sure to select the correct version (Mono or Il2Cpp) based on your target game build

## Basic Usage

Here's a simple example of using S1API in your mod:

```csharp
using System.Collections.Generic;
using S1API.GameTime;
using S1API.Leveling;
using S1API.NPCs;
using S1API.Saveables;

namespace ScheduleOneEnhanced.Mods.BulkBuyer
{
    public class JohnDoe : NPC
    {
        protected override string FirstName => "John";
        protected override string LastName => "Doe";
        protected override string ID => "john_doe";
        
        [SaveableField("Intro")]
        private IntroData? _introData = new IntroData();

        private static readonly (string message, string response)[] IntroTexts = 
        {
            (
                "Nice to meet you kind sir.", 
                "Get outta my messages!"
            ),
            (
                "Alright...", 
                ""
            )
        };

        protected override void OnInitialized()
        {
            TimeManager.OnDayPass += OnDayPass;
        }

        protected override void OnResponseLoaded(Response response)
        {
            switch (response.Label)
            {
                case "PROGRESS_INTRO":
                    response.Callback = ProgressIntro;
                    break;
                
            }
        }

        private void OnDayPass()
        {
            // Play the intro message
            if (!IntroCompleted && LevelManager.Rank >= Rank.Peddler)
            {
                ProgressIntro();
                return;

                SendTextMessage("I'm still watching you... :eyes:");
            }
        }

        private void ProgressIntro()
        {            
            List<Response> responses = new List<Response>();
            if (!IntroCompleted)
                responses.Add(new Response
                {
                    Label = "PROGRESS_INTRO",
                    Text = IntroTexts[_introData.Progress].response,
                    Callback = ProgressIntro
                });
            
            SendTextMessage(IntroTexts[_introData.Progress].message, responses.ToArray());
            
            _introData.Progress++;
        }

        private bool IntroCompleted => _introData != null && _introData.Progress >= IntroTexts.Length - 1;
    }
}
```

## Next Steps

Once you've set up your project with S1API, you can:

- Learn more about the [Installation](/guide/installation) process
- Explore the concepts of [Cross-Compatibility](/guide/cross-compatibility)
- Check out the full [API Reference](/api/) documentation 