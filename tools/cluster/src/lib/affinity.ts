export const hostnameAffinity = (name: string) => ({
    podAntiAffinity: {
        preferredDuringSchedulingIgnoredDuringExecution: [
            {
                weight: 1,
                podAffinityTerm: {
                    labelSelector: {
                        matchExpressions: [
                            {
                                key: 'app',
                                operator: 'In',
                                values: [name],
                            },
                        ],
                    },
                    topologyKey: 'kubernetes.io/hostname',
                },
            },
        ],
    },
})
