import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const tagsWithoutHash = [
        "TechNews",
        "Gadgets",
        "Programming",
        "MobileDevelopment",
        "EmergingTechnologies",
        "Cybersecurity",
        "TechEvents",
        "TechTrends",
        "SoftwareDevelopment",
        "TechCareer",
        "Python",
        "JavaScript",
        "Java",
        "CSharp",
        "Ruby",
        "WebDesign",
        "FrontEnd",
        "BackEnd",
        "ResponsiveDesign",
        "WebDevelopment",
        "iOSDevelopment",
        "AndroidDevelopment",
        "MobileApps",
        "CrossPlatform",
        "Blockchain",
        "AugmentedReality",
        "VirtualReality",
        "IoT",
        "5G",
        "DataScience",
        "MachineLearning",
        "BigData",
        "DataVisualization",
        "Analytics",
        "CyberAwareness",
        "InfoSec",
        "Hacking",
        "SecurityBestPractices",
        "CyberThreats",
        "TechConferences",
        "Hackathons",
        "TechMeetups",
        "DeveloperEvents",
        "TechSummit",
        "ArtificialIntelligence",
        "CloudComputing",
        "EdgeComputing",
        "QuantumComputing",
        "Automation",
        "AgileDevelopment",
        "DevOps",
        "CodeQuality",
        "ContinuousIntegration",
        "VersionControl",
        "TechJobs",
        "CareerAdvice",
        "TechInterviews",
        "Freelancing",
        "TechSkills",
        "SuccessStories",
        "Inspiration",
        "PositiveVibes",
        "Quotes",
        "Mindset",
        "NextJS",
        "ReactJS",
        "ExpressJS",
        "NodeJS",
    ];
    const allTagsFormatted = tagsWithoutHash.map(tag => ({ tag_name: tag }));

    const tagsInsert = await prisma.tag.createMany({
        data: allTagsFormatted
    })
    console.log('tags inserted: ' + tagsInsert.count);
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })